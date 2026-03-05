import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface DayTabsProps {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}

export const DayTabs = ({ value, onValueChange, children }: DayTabsProps) => {
  const dayValues = Array.from({ length: 7 }).map((_, index) => `day-${index + 1}`)
  const activeDayIndex = dayValues.findIndex((dayValue) => dayValue === value)
  const isWeekView = value === 'week'

  const canGoPrev = activeDayIndex > 0
  const canGoNext = activeDayIndex >= 0 && activeDayIndex < dayValues.length - 1
  const currentLabel = activeDayIndex >= 0 ? `Dia ${activeDayIndex + 1}` : 'Semana completa'

  const handlePrev = () => {
    if (!canGoPrev) return
    onValueChange(dayValues[activeDayIndex - 1])
  }

  const handleNext = () => {
    if (!canGoNext) return
    onValueChange(dayValues[activeDayIndex + 1])
  }

  const handleWeekToggle = () => {
    if (isWeekView) {
      onValueChange('day-1')
      return
    }

    onValueChange('week')
  }

  return (
    <Tabs className="w-full" onValueChange={onValueChange} value={value}>
      <div className="mb-4 space-y-2 sm:hidden">
        <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
          <Button
            aria-label="Dia anterior"
            className="h-9 w-9 shrink-0"
            disabled={isWeekView || !canGoPrev}
            onClick={handlePrev}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="min-w-0 text-center text-sm font-semibold text-card-foreground">{currentLabel}</p>
          <Button
            aria-label="Próximo dia"
            className="h-9 w-9 shrink-0"
            disabled={isWeekView || !canGoNext}
            onClick={handleNext}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button className="h-10 w-full" onClick={handleWeekToggle} type="button" variant="outline">
          {isWeekView ? 'Voltar para Dia 1' : 'Semana completa'}
        </Button>
      </div>
      <div className="mb-4 hidden sm:block">
        <TabsList className="hidden h-auto w-full flex-wrap justify-start gap-1 bg-card p-1 shadow-sm sm:inline-flex">
          {Array.from({ length: 7 }).map((_, index) => (
            <TabsTrigger className="min-h-10 px-4 text-sm" key={`desktop-day-${index + 1}`} value={`day-${index + 1}`}>
              Dia {index + 1}
            </TabsTrigger>
          ))}
          <TabsTrigger className="min-h-10 px-4 text-sm" value="week">Semana completa</TabsTrigger>
        </TabsList>
      </div>
      <p className="mb-2 px-1 text-xs text-muted-foreground sm:hidden">
        Deslize para a esquerda/direita no conteúdo para trocar o dia.
      </p>

      {children}
    </Tabs>
  )
}
