import { mealCatalogById } from '@/data/meal-options'
import type { DayPlan, MealSlot, SnackSelection } from '@/types/meal'

const slotKcal: Record<MealSlot, number> = {
  breakfast: 250,
  lunch: 670,
  snack: 410,
  dinner: 340,
}

export const getMealKcal = (slot: MealSlot): number => slotKcal[slot]

export const getDayTotalKcal = (): number =>
  Object.values(slotKcal).reduce((sum, value) => sum + value, 0)

export const isValidSnackSelection = (snack: SnackSelection): boolean => {
  const base = mealCatalogById.snack.base250[snack.baseId]
  const fruit = mealCatalogById.snack.fruit90[snack.fruitId]
  const dairy = mealCatalogById.snack.dairy70[snack.dairyId]

  if (!base || !fruit || !dairy) return false

  return base.kcal + fruit.kcal + dairy.kcal === slotKcal.snack
}

export const validateDayPlan = (dayPlan: DayPlan): boolean => {
  const breakfastExists = Boolean(mealCatalogById.breakfast[dayPlan.meals.breakfastId])
  const dinnerExists = Boolean(mealCatalogById.dinner[dayPlan.meals.dinnerId])
  const lunchExists =
    Boolean(mealCatalogById.lunch.starch[dayPlan.meals.lunch.starchId]) &&
    Boolean(mealCatalogById.lunch.legume[dayPlan.meals.lunch.legumeId]) &&
    Boolean(mealCatalogById.lunch.protein[dayPlan.meals.lunch.proteinId])

  return breakfastExists && dinnerExists && lunchExists && isValidSnackSelection(dayPlan.meals.snack)
}
