import { mealCatalog } from '@/data/meal-options'
import type {
  DayPlan,
  LunchSelection,
  MealOption,
  MealSlot,
  SnackPartSlot,
  SnackSelection,
  SwapMealEquivalentParams,
  WeekPlan,
} from '@/types/meal'

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

const shuffleSnack = (current: SnackSelection): SnackSelection => {
  const base = pickRandomDifferent(mealCatalog.snack.base250, current.baseId)
  const fruit = pickRandomDifferent(mealCatalog.snack.fruit90, current.fruitId)
  const dairy = pickRandomDifferent(mealCatalog.snack.dairy70, current.dairyId)

  let next: SnackSelection = {
    baseId: base.id,
    fruitId: fruit.id,
    dairyId: dairy.id,
  }

  const unchanged =
    next.baseId === current.baseId &&
    next.fruitId === current.fruitId &&
    next.dairyId === current.dairyId

  if (unchanged) {
    if (hasAlternative(mealCatalog.snack.base250, current.baseId)) {
      next = { ...next, baseId: pickRandomDifferent(mealCatalog.snack.base250, current.baseId).id }
    } else if (hasAlternative(mealCatalog.snack.fruit90, current.fruitId)) {
      next = { ...next, fruitId: pickRandomDifferent(mealCatalog.snack.fruit90, current.fruitId).id }
    } else if (hasAlternative(mealCatalog.snack.dairy70, current.dairyId)) {
      next = { ...next, dairyId: pickRandomDifferent(mealCatalog.snack.dairy70, current.dairyId).id }
    }
  }

  return next
}

export const shuffleMeal = (dayPlan: DayPlan, slot: MealSlot): DayPlan => {
  if (dayPlan.locked[slot]) return dayPlan

  switch (slot) {
    case 'breakfast': {
      const nextBreakfast = pickRandomDifferent(mealCatalog.breakfast, dayPlan.meals.breakfastId)
      return {
        ...dayPlan,
        meals: {
          ...dayPlan.meals,
          breakfastId: nextBreakfast.id,
        },
      }
    }
    case 'lunch':
      return {
        ...dayPlan,
        meals: {
          ...dayPlan.meals,
          lunch: shuffleLunch(dayPlan.meals.lunch),
        },
      }
    case 'snack':
      return {
        ...dayPlan,
        meals: {
          ...dayPlan.meals,
          snack: shuffleSnack(dayPlan.meals.snack),
        },
      }
    case 'dinner': {
      const nextDinner = pickRandomDifferent(mealCatalog.dinner, dayPlan.meals.dinnerId)
      return {
        ...dayPlan,
        meals: {
          ...dayPlan.meals,
          dinnerId: nextDinner.id,
        },
      }
    }
  }
}

export const swapSnackPart = (
  dayPlan: DayPlan,
  partSlot: SnackPartSlot,
  newId: string,
): DayPlan => {
  if (dayPlan.locked.snack) return dayPlan

  if (partSlot === 'base250' && !mealCatalog.snack.base250.some((option) => option.id === newId)) {
    return dayPlan
  }

  if (partSlot === 'fruit90' && !mealCatalog.snack.fruit90.some((option) => option.id === newId)) {
    return dayPlan
  }

  if (partSlot === 'dairy70' && !mealCatalog.snack.dairy70.some((option) => option.id === newId)) {
    return dayPlan
  }

  const nextSnack = { ...dayPlan.meals.snack }

  if (partSlot === 'base250') nextSnack.baseId = newId
  if (partSlot === 'fruit90') nextSnack.fruitId = newId
  if (partSlot === 'dairy70') nextSnack.dairyId = newId

  return {
    ...dayPlan,
    meals: {
      ...dayPlan.meals,
      snack: nextSnack,
    },
  }
}

export const swapMealEquivalent = (dayPlan: DayPlan, params: SwapMealEquivalentParams): DayPlan => {
  if (dayPlan.locked[params.slot]) return dayPlan

  if (params.slot === 'breakfast') {
    if (!mealCatalog.breakfast.some((option) => option.id === params.optionId)) return dayPlan

    return {
      ...dayPlan,
      meals: {
        ...dayPlan.meals,
        breakfastId: params.optionId,
      },
    }
  }

  if (params.slot === 'dinner') {
    if (!mealCatalog.dinner.some((option) => option.id === params.optionId)) return dayPlan

    return {
      ...dayPlan,
      meals: {
        ...dayPlan.meals,
        dinnerId: params.optionId,
      },
    }
  }

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

  return swapSnackPart(dayPlan, params.part, params.optionId)
}

export const shuffleDay = (dayPlan: DayPlan): DayPlan => {
  const slots: MealSlot[] = ['breakfast', 'lunch', 'snack', 'dinner']

  return slots.reduce((currentDay, slot) => {
    if (currentDay.locked[slot]) return currentDay
    return shuffleMeal(currentDay, slot)
  }, dayPlan)
}

export const shuffleWeek = (weekPlan: WeekPlan): WeekPlan => ({
  days: weekPlan.days.map((day) => shuffleDay(day)),
})
