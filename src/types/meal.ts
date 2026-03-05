export type MealSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner'

export type SnackPartSlot = 'base250' | 'fruit90' | 'dairy70'

export interface MealOption {
  id: string
  slot: MealSlot | SnackPartSlot
  title: string
  kcal: number
  items: string[]
  tags?: string[]
}

export interface LunchSelection {
  starchId: string
  legumeId: string
  proteinId: string
}

export interface SnackSelection {
  baseId: string
  fruitId: string
  dairyId: string
}

export interface DayMealSelection {
  breakfastId: string
  lunch: LunchSelection
  snack: SnackSelection
  dinnerId: string
}

export interface DayPlan {
  day: number
  meals: DayMealSelection
  locked: Record<MealSlot, boolean>
}

export interface WeekPlan {
  days: DayPlan[]
}

export interface MealSlotConfig {
  slot: MealSlot
  label: string
  time: string
  kcal: number
}

export interface ResolvedMeal {
  title: string
  kcal: number
  items: string[]
}

export interface MealCatalog {
  breakfast: MealOption[]
  lunch: {
    starch: MealOption[]
    legume: MealOption[]
    protein: MealOption[]
  }
  snack: {
    base250: MealOption[]
    fruit90: MealOption[]
    dairy70: MealOption[]
  }
  dinner: MealOption[]
}

export interface MealCatalogById {
  breakfast: Record<string, MealOption>
  lunch: {
    starch: Record<string, MealOption>
    legume: Record<string, MealOption>
    protein: Record<string, MealOption>
  }
  snack: {
    base250: Record<string, MealOption>
    fruit90: Record<string, MealOption>
    dairy70: Record<string, MealOption>
  }
  dinner: Record<string, MealOption>
}

export type LunchPart = keyof LunchSelection

export type SwapMealEquivalentParams =
  | { slot: 'breakfast'; optionId: string }
  | { slot: 'dinner'; optionId: string }
  | { slot: 'lunch'; part: LunchPart; optionId: string }
  | { slot: 'snack'; part: SnackPartSlot; optionId: string }
