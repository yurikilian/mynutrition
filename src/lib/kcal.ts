import { mealCatalogById, mealSlotConfigs } from '@/data/meal-options'
import type { DayPlan, DirectMealSlot, MealSlot } from '@/types/meal'

const slotKcal = mealSlotConfigs.reduce<Record<MealSlot, number>>((acc, slotConfig) => {
  acc[slotConfig.slot] = slotConfig.kcal
  return acc
}, {} as Record<MealSlot, number>)

const directSlots: DirectMealSlot[] = [
  'breakfast',
  'morningSnack',
  'afternoonFruit',
  'afternoonDairy',
  'afternoonSnack',
  'dinner',
  'supper',
]

export const getMealKcal = (slot: MealSlot): number => slotKcal[slot]

export const getDayTotalKcal = (): number =>
  Object.values(slotKcal).reduce((sum, value) => sum + value, 0)

export const validateDayPlan = (dayPlan: DayPlan): boolean => {
  const directMealsExist = directSlots.every((slot) => Boolean(mealCatalogById.direct[slot][dayPlan.meals.direct[slot]]))
  const lunchExists =
    Boolean(mealCatalogById.lunch.starch[dayPlan.meals.lunch.starchId]) &&
    Boolean(mealCatalogById.lunch.legume[dayPlan.meals.lunch.legumeId]) &&
    Boolean(mealCatalogById.lunch.protein[dayPlan.meals.lunch.proteinId])

  return directMealsExist && lunchExists
}
