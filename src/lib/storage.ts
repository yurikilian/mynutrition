import { cloneWeekPlan, initialWeekPlan } from '@/data/initial-week-plan'
import { validateDayPlan } from '@/lib/kcal'
import type { DayPlan, WeekPlan } from '@/types/meal'

export const WEEK_PLAN_STORAGE_KEY = 'nutrition_week_plan_v2'

const hasValidLockedState = (day: DayPlan): boolean =>
  typeof day.locked === 'object' &&
  typeof day.locked.breakfast === 'boolean' &&
  typeof day.locked.morningSnack === 'boolean' &&
  typeof day.locked.lunch === 'boolean' &&
  typeof day.locked.afternoonFruit === 'boolean' &&
  typeof day.locked.afternoonDairy === 'boolean' &&
  typeof day.locked.afternoonSnack === 'boolean' &&
  typeof day.locked.dinner === 'boolean' &&
  typeof day.locked.supper === 'boolean'

const isValidWeekPlanShape = (value: unknown): value is WeekPlan => {
  if (!value || typeof value !== 'object') return false

  const maybeWeekPlan = value as Partial<WeekPlan>
  if (!Array.isArray(maybeWeekPlan.days) || maybeWeekPlan.days.length !== 7) return false

  return maybeWeekPlan.days.every((day, index) => {
    if (!day || typeof day !== 'object') return false
    if (day.day !== index + 1) return false
    if (!hasValidLockedState(day as DayPlan)) return false
    return validateDayPlan(day as DayPlan)
  })
}

export const saveWeekPlan = (plan: WeekPlan): void => {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(WEEK_PLAN_STORAGE_KEY, JSON.stringify(plan))
}

export const loadWeekPlan = (): WeekPlan => {
  if (typeof window === 'undefined') return cloneWeekPlan(initialWeekPlan)

  const raw = window.localStorage.getItem(WEEK_PLAN_STORAGE_KEY)
  if (!raw) return cloneWeekPlan(initialWeekPlan)

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!isValidWeekPlanShape(parsed)) return cloneWeekPlan(initialWeekPlan)
    return cloneWeekPlan(parsed)
  } catch {
    return cloneWeekPlan(initialWeekPlan)
  }
}

export const clearWeekPlanStorage = (): void => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(WEEK_PLAN_STORAGE_KEY)
}
