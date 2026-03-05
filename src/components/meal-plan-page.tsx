import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { Bell, BellOff, ExternalLink, RefreshCcw, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

import { DayTabs } from '@/components/day-tabs'
import { DayView } from '@/components/day-view'
import { ExportPdfButton } from '@/components/export-pdf-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import {
  dailyKcalTarget,
  mealSlotConfigs,
  resolveMealBySlot,
} from '@/data/meal-options'
import { cloneWeekPlan, getInitialDayPlan, initialWeekPlan } from '@/data/initial-week-plan'
import { exportWeekToPdf } from '@/lib/pdf'
import {
  getNextReminderDate,
  loadMealNotificationsEnabled,
  saveMealNotificationsEnabled,
} from '@/lib/notifications'
import { shuffleDay, shuffleMeal, shuffleWeek, swapMealEquivalent } from '@/lib/shuffle'
import { loadWeekPlan, saveWeekPlan } from '@/lib/storage'
import type { DayPlan, MealSlot, SwapMealEquivalentParams, WeekPlan } from '@/types/meal'

const slotOrder: MealSlot[] = ['breakfast', 'lunch', 'snack', 'dinner']

interface StaticDaySectionProps {
  dayPlan: DayPlan
  dayRef?: (node: HTMLDivElement | null) => void
}

const StaticDaySection = ({ dayPlan, dayRef }: StaticDaySectionProps) => {
  const meals = useMemo(
    () =>
      slotOrder.map((slot) => {
        const config = mealSlotConfigs.find((item) => item.slot === slot)
        const meal = resolveMealBySlot(dayPlan, slot)

        return {
          slot,
          config,
          meal,
        }
      }),
    [dayPlan],
  )

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4" ref={dayRef}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
        <h3 className="text-lg font-semibold leading-tight text-card-foreground">Dia {dayPlan.day}</h3>
        <span className="text-sm font-semibold text-primary">{dailyKcalTarget} kcal</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {meals.map(({ slot, config, meal }) => {
          if (!config) return null

          return (
            <Card className="border-border" key={slot}>
              <CardHeader className="space-y-2 pb-2">
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                  <CardTitle className="text-sm leading-tight">{config.label}</CardTitle>
                  <span className="px-1 text-muted-foreground">-</span>
                  <span className="text-sm font-semibold text-secondary-foreground">{config.time}</span>
                  <span className="px-1 text-muted-foreground">-</span>
                  <span className="text-sm font-semibold text-primary">{config.kcal} kcal</span>
                </div>
                <p className="break-words text-sm font-medium leading-snug text-card-foreground">{meal.title}</p>
              </CardHeader>
              <CardContent className="pt-1">
                <ul className="space-y-1 break-words text-sm text-muted-foreground">
                  {meal.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                {meal.preparationUrl ? (
                  <a
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    href={meal.preparationUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {meal.preparationLabel ?? 'Ver preparo'}
                  </a>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export const MealPlanPage = () => {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(() => loadWeekPlan())
  const [tabValue, setTabValue] = useState('day-1')
  const [swipeAnimation, setSwipeAnimation] = useState<'from-left' | 'from-right' | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const isEnabled = loadMealNotificationsEnabled()
    if (!isEnabled) return false
    if (typeof window === 'undefined' || !('Notification' in window)) return false
    if (Notification.permission !== 'granted') {
      saveMealNotificationsEnabled(false)
      return false
    }
    return true
  })
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null)
  const swipeAnimationTimeoutRef = useRef<number | null>(null)
  const notificationsEnabledRef = useRef(notificationsEnabled)
  const notificationTimersRef = useRef<Record<MealSlot, number | null>>({
    breakfast: null,
    lunch: null,
    snack: null,
    dinner: null,
  })
  const weekExportRefs = useRef<Record<number, HTMLDivElement | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  })

  const clearNotificationTimers = () => {
    slotOrder.forEach((slot) => {
      const timerId = notificationTimersRef.current[slot]
      if (!timerId) return
      window.clearTimeout(timerId)
      notificationTimersRef.current[slot] = null
    })
  }

  useEffect(() => {
    saveWeekPlan(weekPlan)
  }, [weekPlan])

  useEffect(() => {
    return () => {
      if (swipeAnimationTimeoutRef.current) {
        window.clearTimeout(swipeAnimationTimeoutRef.current)
      }
      clearNotificationTimers()
    }
  }, [])

  useEffect(() => {
    saveMealNotificationsEnabled(notificationsEnabled)
  }, [notificationsEnabled])

  useEffect(() => {
    notificationsEnabledRef.current = notificationsEnabled
  }, [notificationsEnabled])

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return

    if (Notification.permission !== 'granted') {
      clearNotificationTimers()
      return
    }

    if (!notificationsEnabled) {
      clearNotificationTimers()
      return
    }

    const scheduleSlotReminder = (slot: MealSlot) => {
      const config = mealSlotConfigs.find((item) => item.slot === slot)
      if (!config) return

      const nextReminderDate = getNextReminderDate(config.time, 5)
      const delay = Math.max(nextReminderDate.getTime() - Date.now(), 0)

      notificationTimersRef.current[slot] = window.setTimeout(() => {
        if (Notification.permission !== 'granted' || !notificationsEnabledRef.current) return

        new Notification('My Nutririon', {
          body: `${config.label} em 5 minutos (${config.time}).`,
          tag: `meal-reminder-${slot}`,
        })

        scheduleSlotReminder(slot)
      }, delay)
    }

    clearNotificationTimers()
    slotOrder.forEach((slot) => scheduleSlotReminder(slot))
  }, [notificationsEnabled])

  const updateDayPlan = (dayNumber: number, updater: (dayPlan: DayPlan) => DayPlan): boolean => {
    let changed = false

    setWeekPlan((currentWeek) => {
      const dayIndex = currentWeek.days.findIndex((item) => item.day === dayNumber)
      if (dayIndex < 0) return currentWeek

      const currentDay = currentWeek.days[dayIndex]
      const nextDay = updater(currentDay)

      if (nextDay === currentDay) return currentWeek

      changed = true

      const nextDays = [...currentWeek.days]
      nextDays[dayIndex] = nextDay
      return { days: nextDays }
    })

    return changed
  }

  const handleShuffleMeal = (dayNumber: number, slot: MealSlot) => {
    const changed = updateDayPlan(dayNumber, (dayPlan) => shuffleMeal(dayPlan, slot))

    if (!changed) {
      toast.info('Refeição fixada ou sem alternativa disponível')
      return
    }

    toast.success('Refeição embaralhada')
  }

  const handleSwapMeal = (dayNumber: number, params: SwapMealEquivalentParams) => {
    const changed = updateDayPlan(dayNumber, (dayPlan) => swapMealEquivalent(dayPlan, params))

    if (!changed) {
      toast.info('Refeição fixada ou seleção inválida')
      return
    }

    toast.success('Refeição atualizada com equivalência calórica')
  }

  const handleShuffleSnackCombo = (dayNumber: number) => {
    const changed = updateDayPlan(dayNumber, (dayPlan) => shuffleMeal(dayPlan, 'snack'))

    if (!changed) {
      toast.info('Lanche fixado ou sem alternativa disponível')
      return
    }

    toast.success('Nova combinação de lanche gerada')
  }

  const handleToggleLock = (dayNumber: number, slot: MealSlot) => {
    let nextLock = false

    const changed = updateDayPlan(dayNumber, (dayPlan) => {
      nextLock = !dayPlan.locked[slot]
      return {
        ...dayPlan,
        locked: {
          ...dayPlan.locked,
          [slot]: nextLock,
        },
      }
    })

    if (!changed) return

    toast.success(nextLock ? 'Refeição fixada' : 'Refeição desfixada')
  }

  const handleShuffleDay = (dayNumber: number) => {
    const changed = updateDayPlan(dayNumber, (dayPlan) => shuffleDay(dayPlan))

    if (!changed) {
      toast.info('Todas as refeições deste dia estão fixadas')
      return
    }

    toast.success(`Dia ${dayNumber} embaralhado`)
  }

  const handleResetDay = (dayNumber: number) => {
    const changed = updateDayPlan(dayNumber, () => getInitialDayPlan(dayNumber))

    if (!changed) return

    toast.success(`Dia ${dayNumber} resetado para o plano inicial`)
  }

  const handleShuffleWeek = () => {
    let changed = false

    setWeekPlan((currentWeek) => {
      const nextWeek = shuffleWeek(currentWeek)
      const didChange = nextWeek.days.some((day, index) => day !== currentWeek.days[index])
      if (!didChange) return currentWeek

      changed = true
      return nextWeek
    })

    if (!changed) {
      toast.info('Todas as refeições estão fixadas')
      return
    }

    toast.success('Semana completa embaralhada')
  }

  const handleResetPlan = () => {
    setWeekPlan(cloneWeekPlan(initialWeekPlan))
    toast.success('Plano resetado para a versão inicial de 7 dias')
  }

  const handleExportWeek = async () => {
    const elements = weekPlan.days
      .map((day) => weekExportRefs.current[day.day])
      .filter((node): node is HTMLDivElement => Boolean(node))

    if (elements.length !== 7) {
      toast.error('A visualização de exportação da semana ainda não está pronta')
      return
    }

    await exportWeekToPdf(elements, 'meal-plan-week.pdf')
    toast.success('Semana exportada em PDF')
  }

  const getActiveDayFromTab = (value: string): number | null => {
    if (!value.startsWith('day-')) return null
    const day = Number(value.replace('day-', ''))
    if (!Number.isFinite(day) || day < 1 || day > 7) return null
    return day
  }

  const clearSwipeAnimationTimer = () => {
    if (swipeAnimationTimeoutRef.current) {
      window.clearTimeout(swipeAnimationTimeoutRef.current)
      swipeAnimationTimeoutRef.current = null
    }
  }

  const startDayTransition = (nextTabValue: string, animation: 'from-left' | 'from-right' | null) => {
    clearSwipeAnimationTimer()

    setSwipeAnimation(animation)
    setTabValue(nextTabValue)

    if (!animation) return

    swipeAnimationTimeoutRef.current = window.setTimeout(() => {
      setSwipeAnimation(null)
      swipeAnimationTimeoutRef.current = null
    }, 320)
  }

  const handleDaySwipe = (direction: 'next' | 'prev') => {
    const activeDay = getActiveDayFromTab(tabValue)
    if (activeDay === null) return

    const nextDay = direction === 'next' ? Math.min(7, activeDay + 1) : Math.max(1, activeDay - 1)
    if (nextDay === activeDay) return

    startDayTransition(`day-${nextDay}`, direction === 'next' ? 'from-right' : 'from-left')
  }

  const onDayTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0]
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const onDayTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeStartRef.current) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - swipeStartRef.current.x
    const deltaY = touch.clientY - swipeStartRef.current.y
    swipeStartRef.current = null

    const isHorizontalSwipe = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3
    if (!isHorizontalSwipe) return

    if (deltaX < 0) {
      handleDaySwipe('next')
      return
    }

    handleDaySwipe('prev')
  }

  const handleTabValueChange = (value: string) => {
    if (value === tabValue) return

    const currentDay = getActiveDayFromTab(tabValue)
    const nextDay = getActiveDayFromTab(value)

    if (currentDay !== null && nextDay !== null) {
      const animation = nextDay > currentDay ? 'from-right' : 'from-left'
      startDayTransition(value, animation)
      return
    }

    startDayTransition(value, null)
  }

  const handleNotificationsSubscription = async () => {
    if (!('Notification' in window)) {
      toast.error('Este navegador não suporta notificações.')
      return
    }

    if (notificationsEnabled) {
      setNotificationsEnabled(false)
      toast.success('Notificações desativadas.')
      return
    }

    if (Notification.permission === 'denied') {
      toast.error('Notificações bloqueadas no navegador. Ative nas permissões do site.')
      return
    }

    let permission: NotificationPermission = Notification.permission
    if (permission !== 'granted') {
      permission = await Notification.requestPermission()
    }

    if (permission !== 'granted') {
      toast.error('Permissão de notificação não concedida.')
      return
    }

    setNotificationsEnabled(true)
    toast.success('Lembretes ativados: você será notificado 5 min antes de cada refeição.')
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-5 px-3 pb-24 pt-4 sm:px-4 sm:pb-6 sm:pt-6 md:space-y-6 md:px-6 md:pb-8 md:pt-8">
      <header className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">My Nutririon</p>
            <h1 className="text-xl font-semibold leading-tight text-card-foreground sm:text-2xl md:text-3xl">Plano alimentar de 7 dias</h1>
          </div>
          <Badge className="rounded-full bg-primary px-3 py-1 text-sm font-semibold leading-none text-primary-foreground hover:bg-primary">
            Meta: 1670 kcal/dia
          </Badge>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <p>Homem, 35 anos, 92,4 kg, 1,69 m, rotina sedentária.</p>
          <p>TMB: 1810,25 kcal/dia • Gasto sedentário estimado: 2172,3 kcal/dia.</p>
        </div>

        <div className="no-export hidden grid-cols-1 gap-2 border-t border-border pt-3 sm:flex sm:flex-wrap">
          <Button className="h-10 sm:h-9" onClick={handleShuffleWeek} size="sm" type="button" variant="outline">
            <RefreshCcw className="h-4 w-4" />
            Embaralhar semana
          </Button>
          <Button className="h-10 sm:h-9" onClick={handleResetPlan} size="sm" type="button" variant="outline">
            <RotateCcw className="h-4 w-4" />
            Resetar plano
          </Button>
          <ExportPdfButton className="h-10 sm:h-9" label="Exportar semana em PDF" onExport={handleExportWeek} />
        </div>
      </header>

      <div className="no-export rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-card-foreground">Lembretes de refeição</p>
            <p className="text-xs text-muted-foreground">
              Ative para receber notificações 5 minutos antes de 08:00, 12:30, 16:30 e 20:00.
            </p>
          </div>
          <Button className="h-10 w-full sm:w-auto" onClick={() => void handleNotificationsSubscription()} type="button" variant="outline">
            {notificationsEnabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {notificationsEnabled ? 'Desativar notificações' : 'Inscrever notificações'}
          </Button>
        </div>
      </div>

      <DayTabs onValueChange={handleTabValueChange} value={tabValue}>
        {weekPlan.days.map((dayPlan) => (
          <TabsContent key={dayPlan.day} value={`day-${dayPlan.day}`}>
            <div
              className={
                tabValue === `day-${dayPlan.day}` && swipeAnimation
                  ? swipeAnimation === 'from-right'
                    ? 'swipe-enter-from-right'
                    : 'swipe-enter-from-left'
                  : ''
              }
              onTouchEnd={onDayTouchEnd}
              onTouchStart={onDayTouchStart}
            >
              <DayView
                dayPlan={dayPlan}
                onResetDay={handleResetDay}
                onShuffleDay={handleShuffleDay}
                onShuffleMeal={handleShuffleMeal}
                onShuffleSnackCombo={handleShuffleSnackCombo}
                onSwapMeal={handleSwapMeal}
                onToggleLock={handleToggleLock}
              />
            </div>
          </TabsContent>
        ))}

        <TabsContent value="week">
          <div className="space-y-4 pb-24 sm:pb-0">
            {weekPlan.days.map((dayPlan) => (
              <StaticDaySection dayPlan={dayPlan} key={dayPlan.day} />
            ))}
          </div>
        </TabsContent>
      </DayTabs>

      {tabValue === 'week' ? (
        <div className="no-export fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
            <Button className="h-11 px-2 text-xs" onClick={handleShuffleWeek} type="button" variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Semana
            </Button>
            <Button className="h-11 px-2 text-xs" onClick={handleResetPlan} type="button" variant="outline">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <ExportPdfButton className="h-11 px-2 text-xs" label="PDF" onExport={handleExportWeek} />
          </div>
        </div>
      ) : null}

      <div aria-hidden className="pointer-events-none fixed -left-[10000px] top-0 w-[900px] bg-white p-6">
        <div className="space-y-5 bg-white">
          {weekPlan.days.map((dayPlan) => (
            <StaticDaySection
              dayPlan={dayPlan}
              dayRef={(node) => {
                weekExportRefs.current[dayPlan.day] = node
              }}
              key={`export-${dayPlan.day}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
