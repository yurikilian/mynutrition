import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ExportPdfButtonProps {
  label: string
  onExport: () => Promise<void>
  className?: string
  variant?: 'default' | 'outline' | 'secondary'
}

export const ExportPdfButton = ({
  label,
  onExport,
  className,
  variant = 'outline',
}: ExportPdfButtonProps) => {
  const [isExporting, setIsExporting] = useState(false)

  const handleClick = async () => {
    if (isExporting) return

    setIsExporting(true)
    try {
      await onExport()
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      className={className}
      disabled={isExporting}
      onClick={handleClick}
      size="sm"
      type="button"
      variant={variant}
    >
      {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {label}
    </Button>
  )
}
