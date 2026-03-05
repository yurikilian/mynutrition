import { Target } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface DailySummaryProps {
  totalKcal: number
}

export const DailySummary = ({ totalKcal }: DailySummaryProps) => {
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4 text-muted-foreground" />
          Total diário
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary">{totalKcal} kcal</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
