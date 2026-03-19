import { useEffect, useMemo, useRef, useState } from 'react'
import { RefreshCcw, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

import { DailySummary } from '@/components/daily-summary'
import { ExportPdfButton } from '@/components/export-pdf-button'
import { MealCard } from '@/components/meal-card'
import { MealSwapDrawer } from '@/components/meal-swap-drawer'
import { Button } from '@/components/ui/button'
import { mealSlotConfigs, resolveMealBySlot } from '@/data/meal-options'
import { getDayTotalKcal } from '@/lib/kcal'
import { exportCardToPdf, exportDayToPdf } from '@/lib/pdf'
import type { DayPlan, MealSlot, SwapMealEquivalentParams } from '@/types/meal'

interface DayViewProps {
  dayPlan: DayPlan
  onShuffleMeal: (day: number, slot: MealSlot) => void
  onSwapMeal: (day: number, params: SwapMealEquivalentParams) => void
  onToggleLock: (day: number, slot: MealSlot) => void
  onShuffleDay: (day: number) => void
  onResetDay: (day: number) => void
}

export const DayView = ({
  dayPlan,
  onShuffleMeal,
  onSwapMeal,
  onToggleLock,
  onShuffleDay,
  onResetDay,
}: DayViewProps) => {
  const dayRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Record<MealSlot, HTMLDivElement | null>>({
    breakfast: null,
    morningSnack: null,
    lunch: null,
    afternoonFruit: null,
    afternoonDairy: null,
    afternoonSnack: null,
    dinner: null,
    supper: null,
  })

  const [swapSlot, setSwapSlot] = useState<MealSlot | null>(null)
  const [highlightedSlot, setHighlightedSlot] = useState<MealSlot | null>(null)

  useEffect(() => {
    if (!highlightedSlot) return

    const timeout = window.setTimeout(() => {
      setHighlightedSlot(null)
    }, 600)

    return () => window.clearTimeout(timeout)
  }, [highlightedSlot])

  const meals = useMemo(
    () => ({
      breakfast: resolveMealBySlot(dayPlan, 'breakfast'),
      morningSnack: resolveMealBySlot(dayPlan, 'morningSnack'),
      lunch: resolveMealBySlot(dayPlan, 'lunch'),
      afternoonFruit: resolveMealBySlot(dayPlan, 'afternoonFruit'),
      afternoonDairy: resolveMealBySlot(dayPlan, 'afternoonDairy'),
      afternoonSnack: resolveMealBySlot(dayPlan, 'afternoonSnack'),
      dinner: resolveMealBySlot(dayPlan, 'dinner'),
      supper: resolveMealBySlot(dayPlan, 'supper'),
    }),
    [dayPlan],
  )

  const totalKcal = getDayTotalKcal()

  const handleExportDay = async () => {
    if (!dayRef.current) return

    await exportDayToPdf(dayRef.current, `meal-plan-day-${dayPlan.day}.pdf`)
    toast.success(`Dia ${dayPlan.day} exportado em PDF`)
  }

  const handleExportCard = async (slot: MealSlot) => {
    const element = cardRefs.current[slot]
    if (!element) return

    await exportCardToPdf(element, `day-${dayPlan.day}-${slot}.pdf`)
    toast.success(`Card de ${slotConfigLabel(slot)} exportado em PDF`)
  }

  const applySlotAction = (slot: MealSlot, action: () => void) => {
    action()
    setHighlightedSlot(slot)
  }

  return (
    <div className="space-y-4 pb-24 sm:pb-0">
      <div className="no-export hidden flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-foreground">Ações do dia {dayPlan.day}</h2>
        <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <Button className="h-10 sm:h-9" onClick={() => onShuffleDay(dayPlan.day)} size="sm" type="button" variant="outline">
            <RefreshCcw className="h-4 w-4" />
            Embaralhar dia
          </Button>
          <Button className="h-10 sm:h-9" onClick={() => onResetDay(dayPlan.day)} size="sm" type="button" variant="outline">
            <RotateCcw className="h-4 w-4" />
            Resetar dia
          </Button>
          <ExportPdfButton className="h-10 sm:h-9" label="Exportar dia em PDF" onExport={handleExportDay} />
        </div>
      </div>

      <DailySummary totalKcal={totalKcal} />

      <div className="space-y-4" ref={dayRef}>
        {mealSlotConfigs.map((slotConfig) => {
          const slot = slotConfig.slot
          const meal = meals[slot]

          return (
            <MealCard
              highlighted={highlightedSlot === slot}
              items={meal.items}
              kcal={slotConfig.kcal}
              key={slot}
              label={slotConfig.label}
              locked={dayPlan.locked[slot]}
              preparationLabel={meal.preparationLabel}
              preparationUrl={meal.preparationUrl}
              onExport={() => {
                handleExportCard(slot).catch(() => {
                  toast.error('Não foi possível exportar este card')
                })
              }}
              onShuffle={() => applySlotAction(slot, () => onShuffleMeal(dayPlan.day, slot))}
              onSwap={() => setSwapSlot(slot)}
              onToggleLock={() => onToggleLock(dayPlan.day, slot)}
              ref={(node) => {
                cardRefs.current[slot] = node
              }}
              time={slotConfig.time}
              title={meal.title}
            />
          )
        })}
      </div>

      {swapSlot ? (
        <MealSwapDrawer
          dayPlan={dayPlan}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) setSwapSlot(null)
          }}
          onSwapMeal={(params) => {
            onSwapMeal(dayPlan.day, params)
            setHighlightedSlot(params.slot)
          }}
          open={Boolean(swapSlot)}
          slot={swapSlot}
        />
      ) : null}

      <div className="no-export fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
          <Button className="h-11 px-2 text-xs" onClick={() => onShuffleDay(dayPlan.day)} type="button" variant="outline">
            <RefreshCcw className="h-4 w-4" />
            Dia
          </Button>
          <Button className="h-11 px-2 text-xs" onClick={() => onResetDay(dayPlan.day)} type="button" variant="outline">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <ExportPdfButton className="h-11 px-2 text-xs" label="PDF" onExport={handleExportDay} />
        </div>
      </div>
    </div>
  )
}

const slotConfigLabel = (slot: MealSlot): string => {
  switch (slot) {
    case 'breakfast':
      return 'desjejum'
    case 'morningSnack':
      return 'lanche da manhã'
    case 'lunch':
      return 'almoço'
    case 'afternoonFruit':
      return 'lanche da tarde 1'
    case 'afternoonDairy':
      return 'lanche da tarde 2'
    case 'afternoonSnack':
      return 'lanche da tarde 3'
    case 'dinner':
      return 'jantar'
    case 'supper':
      return 'ceia'
  }
}
