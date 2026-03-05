import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

type PdfExportMode = 'card' | 'day'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

const exportSafeThemeVars: Record<string, string> = {
  background: '#ffffff',
  foreground: '#1f2937',
  card: '#ffffff',
  'card-foreground': '#1f2937',
  popover: '#ffffff',
  'popover-foreground': '#1f2937',
  primary: '#b45309',
  'primary-foreground': '#ffffff',
  secondary: '#f5efe6',
  'secondary-foreground': '#92400e',
  muted: '#f8f5ef',
  'muted-foreground': '#4b5563',
  accent: '#f2e8dc',
  'accent-foreground': '#92400e',
  destructive: '#dc2626',
  'destructive-foreground': '#ffffff',
  border: '#eadfcd',
  input: '#eadfcd',
  ring: '#b45309',
}

const applyGlobalExportColorFallback = (): (() => void) => {
  const root = document.documentElement
  const body = document.body

  const previousVarValues = Object.keys(exportSafeThemeVars).reduce<Record<string, string>>((acc, key) => {
    acc[key] = root.style.getPropertyValue(`--${key}`)
    return acc
  }, {})

  const previousRootBackground = root.style.backgroundColor
  const previousBodyBackground = body.style.backgroundColor
  const previousBodyColor = body.style.color

  Object.entries(exportSafeThemeVars).forEach(([name, value]) => {
    root.style.setProperty(`--${name}`, value)
  })

  root.style.backgroundColor = '#ffffff'
  body.style.backgroundColor = '#ffffff'
  body.style.color = '#111827'

  return () => {
    Object.entries(previousVarValues).forEach(([name, value]) => {
      if (value) {
        root.style.setProperty(`--${name}`, value)
        return
      }

      root.style.removeProperty(`--${name}`)
    })

    root.style.backgroundColor = previousRootBackground
    body.style.backgroundColor = previousBodyBackground
    body.style.color = previousBodyColor
  }
}

const createNormalizedExportChip = (text: string): HTMLSpanElement => {
  const chip = document.createElement('span')
  const isKcal = /kcal/i.test(text)
  const isTime = /\b\d{1,2}:\d{2}\b/.test(text)
  const usePrimary = isKcal
  const useSecondary = isTime || !isKcal

  chip.textContent = text
  chip.style.display = 'inline-flex'
  chip.style.alignItems = 'center'
  chip.style.justifyContent = 'center'
  chip.style.height = '1.9rem'
  chip.style.minHeight = '1.9rem'
  chip.style.padding = '0.3rem 0.85rem'
  chip.style.borderRadius = '9999px'
  chip.style.lineHeight = '1'
  chip.style.fontSize = '0.9rem'
  chip.style.fontWeight = '700'
  chip.style.whiteSpace = 'nowrap'
  chip.style.boxSizing = 'border-box'
  chip.style.margin = '0'
  chip.style.position = 'relative'
  chip.style.top = '0'

  if (usePrimary) {
    chip.style.background = exportSafeThemeVars.primary
    chip.style.color = exportSafeThemeVars['primary-foreground']
    return chip
  }

  if (useSecondary) {
    chip.style.background = exportSafeThemeVars.secondary
    chip.style.color = exportSafeThemeVars['secondary-foreground']
  }

  return chip
}

const normalizeExportLabelRows = (root: HTMLElement): void => {
  const labelRows = root.querySelectorAll<HTMLElement>('[data-export-label-row]')

  labelRows.forEach((row) => {
    const title = row.querySelector<HTMLElement>('[data-export-title]')
    if (!title) return

    const titleClone = title.cloneNode(true) as HTMLElement
    titleClone.removeAttribute('data-export-title')
    titleClone.style.display = 'inline-flex'
    titleClone.style.alignItems = 'center'
    titleClone.style.height = '1.9rem'
    titleClone.style.minHeight = '1.9rem'
    titleClone.style.margin = '0'
    titleClone.style.padding = '0'
    titleClone.style.lineHeight = '1'
    titleClone.style.whiteSpace = 'nowrap'
    titleClone.style.transform = 'none'
    titleClone.style.position = 'relative'
    titleClone.style.top = '0'

    const normalizedRow = document.createElement('div')
    normalizedRow.style.display = 'flex'
    normalizedRow.style.flexDirection = 'column'
    normalizedRow.style.alignItems = 'flex-start'
    normalizedRow.style.rowGap = '0.45rem'

    titleClone.style.height = 'auto'
    titleClone.style.minHeight = '0'
    titleClone.style.lineHeight = '1.2'
    normalizedRow.appendChild(titleClone)

    const chipsRow = document.createElement('div')
    chipsRow.style.display = 'flex'
    chipsRow.style.flexWrap = 'wrap'
    chipsRow.style.alignItems = 'center'
    chipsRow.style.columnGap = '0.75rem'
    chipsRow.style.rowGap = '0.4rem'

    row.querySelectorAll<HTMLElement>('[data-export-chip]').forEach((chipNode) => {
      const text = chipNode.textContent?.trim()
      if (!text) return
      chipsRow.appendChild(createNormalizedExportChip(text))
    })

    normalizedRow.appendChild(chipsRow)
    row.replaceWith(normalizedRow)
  })
}

const normalizeExportDayHeaders = (root: HTMLElement): void => {
  const headers = root.querySelectorAll<HTMLElement>('[data-export-day-header]')

  headers.forEach((header) => {
    const title = header.querySelector<HTMLElement>('[data-export-title]')
    const chip = header.querySelector<HTMLElement>('[data-export-chip]')
    if (!title || !chip) return

    const titleClone = title.cloneNode(true) as HTMLElement
    titleClone.removeAttribute('data-export-title')
    titleClone.style.display = 'inline-flex'
    titleClone.style.alignItems = 'center'
    titleClone.style.height = '1.9rem'
    titleClone.style.minHeight = '1.9rem'
    titleClone.style.margin = '0'
    titleClone.style.padding = '0'
    titleClone.style.lineHeight = '1'
    titleClone.style.whiteSpace = 'nowrap'
    titleClone.style.transform = 'none'
    titleClone.style.position = 'relative'
    titleClone.style.top = '0'

    const chipText = chip.textContent?.trim() ?? ''
    const normalizedChip = createNormalizedExportChip(chipText)

    header.replaceChildren(titleClone, normalizedChip)
    header.style.display = 'flex'
    header.style.alignItems = 'center'
    header.style.justifyContent = 'space-between'
    header.style.columnGap = '0.75rem'
  })
}

const renderElementToCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  const restoreGlobalColors = applyGlobalExportColorFallback()

  const wrapper = document.createElement('div')
  wrapper.style.position = 'fixed'
  wrapper.style.left = '-10000px'
  wrapper.style.top = '0'
  wrapper.style.zIndex = '-1'
  wrapper.style.background = '#ffffff'
  wrapper.style.padding = '24px'

  const clone = element.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.no-export').forEach((node) => node.remove())
  clone.style.background = '#ffffff'
  clone.style.color = '#0f172a'

  // html2canvas does not support oklch() parsing in some browsers.
  // Force export-safe RGB/HEX theme variables only inside the cloned tree.
  Object.entries(exportSafeThemeVars).forEach(([name, value]) => {
    clone.style.setProperty(`--${name}`, value)
  })

  normalizeExportLabelRows(clone)
  normalizeExportDayHeaders(clone)

  const exportFixStyle = document.createElement('style')
  exportFixStyle.textContent = `
    [data-export-chip] {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: 1.9rem !important;
      min-height: 1.9rem !important;
      padding: 0.3rem 0.85rem !important;
      line-height: 1 !important;
      vertical-align: middle !important;
      white-space: nowrap !important;
      margin: 0 !important;
      transform: none !important;
      top: 0 !important;
      bottom: auto !important;
      box-sizing: border-box !important;
    }
    [data-export-label-row] {
      display: grid !important;
      grid-auto-flow: column !important;
      grid-auto-columns: max-content !important;
      justify-content: start !important;
      align-items: center !important;
      column-gap: 0.75rem !important;
      row-gap: 0.5rem !important;
    }
    [data-export-label-row] > * {
      margin: 0 !important;
      align-self: center !important;
      transform: none !important;
      top: 0 !important;
      bottom: auto !important;
      position: relative !important;
    }
    [data-export-title] {
      line-height: 1.15 !important;
      margin: 0 !important;
      transform: none !important;
      top: 0 !important;
      position: relative !important;
      white-space: nowrap !important;
    }
    [data-export-day-header] {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
  `
  clone.prepend(exportFixStyle)

  wrapper.appendChild(clone)
  document.body.appendChild(wrapper)

  try {
    return await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
    })
  } finally {
    document.body.removeChild(wrapper)
    restoreGlobalColors()
  }
}

const addCanvasToPdf = (pdf: jsPDF, canvas: HTMLCanvasElement, mode: PdfExportMode): void => {
  const imageData = canvas.toDataURL('image/png')

  if (mode === 'card') {
    const maxWidth = 170
    const maxHeight = 240
    const widthRatio = maxWidth / canvas.width
    const heightRatio = maxHeight / canvas.height
    const ratio = Math.min(widthRatio, heightRatio)

    const imageWidth = canvas.width * ratio
    const imageHeight = canvas.height * ratio
    const x = (A4_WIDTH_MM - imageWidth) / 2
    const y = (A4_HEIGHT_MM - imageHeight) / 2

    pdf.addImage(imageData, 'PNG', x, y, imageWidth, imageHeight)
    return
  }

  const horizontalMargin = 12
  const verticalMargin = 12
  const maxWidth = A4_WIDTH_MM - horizontalMargin * 2
  const maxHeight = A4_HEIGHT_MM - verticalMargin * 2
  const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height)

  const imageWidth = canvas.width * ratio
  const imageHeight = canvas.height * ratio

  pdf.addImage(imageData, 'PNG', horizontalMargin, verticalMargin, imageWidth, imageHeight)
}

export const exportElementToPdf = async (
  element: HTMLElement,
  filename: string,
  mode: PdfExportMode,
): Promise<void> => {
  const canvas = await renderElementToCanvas(element)
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  addCanvasToPdf(pdf, canvas, mode)
  pdf.save(filename)
}

export const exportCardToPdf = async (element: HTMLElement, filename: string): Promise<void> => {
  await exportElementToPdf(element, filename, 'card')
}

export const exportDayToPdf = async (element: HTMLElement, filename: string): Promise<void> => {
  await exportElementToPdf(element, filename, 'day')
}

export const exportWeekToPdf = async (dayElements: HTMLElement[], filename: string): Promise<void> => {
  if (dayElements.length === 0) return

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  for (let i = 0; i < dayElements.length; i += 1) {
    const canvas = await renderElementToCanvas(dayElements[i])

    if (i > 0) {
      pdf.addPage('a4', 'portrait')
    }

    addCanvasToPdf(pdf, canvas, 'day')
  }

  pdf.save(filename)
}
