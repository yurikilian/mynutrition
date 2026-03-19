import { mealCatalog } from '@/data/meal-options'
import type { DayPlan, DirectMealSlot, LunchSelection, MealOption, MealSlot, SwapMealEquivalentParams, WeekPlan } from '@/types/meal'

const randomIndex = (length: number): number => Math.floor(Math.random() * length)

const sampleUnique = <T,>(values: T[], count: number): T[] => {
  const pool = [...values]
  const picked: T[] = []

  while (pool.length > 0 && picked.length < count) {
    const index = randomIndex(pool.length)
    const [item] = pool.splice(index, 1)
    if (item !== undefined) picked.push(item)
  }

  return picked
}

const hasAlternative = (options: MealOption[], currentId: string): boolean =>
  options.some((option) => option.id !== currentId)

export const pickRandomDifferent = <T extends { id: string }>(items: T[], currentId: string): T => {
  if (items.length <= 1) return items[0]

  const candidates = items.filter((item) => item.id !== currentId)
  if (candidates.length === 0) return items[0]

  return candidates[randomIndex(candidates.length)]
}

const shuffleLunch = (current: LunchSelection): LunchSelection => {
  const partDescriptors = [
    {
      key: 'starchId' as const,
      options: mealCatalog.lunch.starch,
      currentId: current.starchId,
    },
    {
      key: 'legumeId' as const,
      options: mealCatalog.lunch.legume,
      currentId: current.legumeId,
    },
    {
      key: 'proteinId' as const,
      options: mealCatalog.lunch.protein,
      currentId: current.proteinId,
    },
  ]

  const mutableParts = partDescriptors.filter((part) => hasAlternative(part.options, part.currentId))
  if (mutableParts.length === 0) return current

  const numberOfPartsToChange = Math.max(1, Math.min(mutableParts.length, randomIndex(3) + 1))
  const selectedParts = sampleUnique(mutableParts, numberOfPartsToChange)

  const next = { ...current }

  selectedParts.forEach((part) => {
    const picked = pickRandomDifferent(part.options, part.currentId)
    next[part.key] = picked.id
  })

  return next
}

const shuffleDirectMeal = (dayPlan: DayPlan, slot: DirectMealSlot): DayPlan => {
  const currentId = dayPlan.meals.direct[slot]
  const nextOption = pickRandomDifferent(mealCatalog.direct[slot], currentId)

  return {
    ...dayPlan,
    meals: {
      ...dayPlan.meals,
      direct: {
        ...dayPlan.meals.direct,
        [slot]: nextOption.id,
      },
      lunch: dayPlan.meals.lunch,
    },
  }
}

export const shuffleMeal = (dayPlan: DayPlan, slot: MealSlot): DayPlan => {
  if (dayPlan.locked[slot]) return dayPlan

  if (slot === 'lunch') {
    return {
      ...dayPlan,
      meals: {
        ...dayPlan.meals,
        lunch: shuffleLunch(dayPlan.meals.lunch),
      },
    }
  }

  return shuffleDirectMeal(dayPlan, slot)
}

export const swapMealEquivalent = (dayPlan: DayPlan, params: SwapMealEquivalentParams): DayPlan => {
  if (dayPlan.locked[params.slot]) return dayPlan

  if (params.slot === 'lunch') {
    const nextLunch = { ...dayPlan.meals.lunch }

    if (params.part === 'starchId') {
      if (!mealCatalog.lunch.starch.some((option) => option.id === params.optionId)) return dayPlan
      nextLunch.starchId = params.optionId
    }

    if (params.part === 'legumeId') {
      if (!mealCatalog.lunch.legume.some((option) => option.id === params.optionId)) return dayPlan
      nextLunch.legumeId = params.optionId
    }

    if (params.part === 'proteinId') {
      if (!mealCatalog.lunch.protein.some((option) => option.id === params.optionId)) return dayPlan
      nextLunch.proteinId = params.optionId
    }

    return {
      ...dayPlan,
      meals: {
        ...dayPlan.meals,
        lunch: nextLunch,
      },
    }
  }

  if (!mealCatalog.direct[params.slot].some((option) => option.id === params.optionId)) return dayPlan

  return {
    ...dayPlan,
    meals: {
      ...dayPlan.meals,
      direct: {
        ...dayPlan.meals.direct,
        [params.slot]: params.optionId,
      },
      lunch: dayPlan.meals.lunch,
    },
  }
}

export const shuffleDay = (dayPlan: DayPlan): DayPlan =>
  (['breakfast', 'morningSnack', 'lunch', 'afternoonFruit', 'afternoonDairy', 'afternoonSnack', 'dinner', 'supper'] as MealSlot[]).reduce(
    (currentDay, slot) => {
      if (currentDay.locked[slot]) return currentDay
      return shuffleMeal(currentDay, slot)
    },
    dayPlan,
  )

export const shuffleWeek = (weekPlan: WeekPlan): WeekPlan => ({
  days: weekPlan.days.map((day) => shuffleDay(day)),
})
