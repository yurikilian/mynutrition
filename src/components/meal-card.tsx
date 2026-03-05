import { forwardRef } from 'react'
import { FileDown, Lock, LockOpen, Shuffle, SquarePen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MealCardProps {
  label: string
  time: string
  kcal: number
  title: string
  items: string[]
  locked: boolean
  highlighted: boolean
  onShuffle: () => void
  onSwap: () => void
  onToggleLock: () => void
  onExport: () => void
}

export const MealCard = forwardRef<HTMLDivElement, MealCardProps>(
  (
    {
      label,
      time,
      kcal,
      title,
      items,
      locked,
      highlighted,
      onShuffle,
      onSwap,
      onToggleLock,
      onExport,
    },
    ref,
  ) => {
    return (
      <Card
        className={cn(
          'border-border bg-card transition-all duration-300',
          highlighted ? 'ring-2 ring-primary/30' : 'ring-0',
          locked && 'border-primary/40',
        )}
        ref={ref}
      >
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <CardTitle className="text-base font-semibold leading-tight text-card-foreground">{label}</CardTitle>
            <span className="px-1 text-muted-foreground">-</span>
            <span className="text-sm font-semibold text-secondary-foreground">{time}</span>
            <span className="px-1 text-muted-foreground">-</span>
            <span className="text-sm font-semibold text-primary">{kcal} kcal</span>
            {locked ? (
              <>
                <span className="px-1 text-muted-foreground">-</span>
                <span className="text-sm font-semibold text-primary">Fixada</span>
              </>
            ) : null}
          </div>
          <p className="break-words text-sm font-medium leading-snug text-card-foreground">{title}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <ul className="space-y-1 break-words text-sm text-muted-foreground">
            {items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <div className="no-export grid grid-cols-2 gap-2 pt-1 sm:flex sm:flex-wrap">
            <Button className="h-10 w-full justify-start whitespace-normal text-left sm:h-9 sm:w-auto sm:justify-center" onClick={onShuffle} size="sm" variant="outline">
              <Shuffle className="h-4 w-4" />
              Embaralhar
            </Button>
            <Button className="h-10 w-full justify-start whitespace-normal text-left sm:h-9 sm:w-auto sm:justify-center" onClick={onSwap} size="sm" variant="outline">
              <SquarePen className="h-4 w-4" />
              Trocar refeição
            </Button>
            <Button className="h-10 w-full justify-start whitespace-normal text-left sm:h-9 sm:w-auto sm:justify-center" onClick={onToggleLock} size="sm" variant="outline">
              {locked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {locked ? 'Desfixar' : 'Fixar'}
            </Button>
            <Button className="h-10 w-full justify-start whitespace-normal text-left sm:h-9 sm:w-auto sm:justify-center" onClick={onExport} size="sm" variant="outline">
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  },
)

MealCard.displayName = 'MealCard'
