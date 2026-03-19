export type MealSlot =
  | 'breakfast'
  | 'morningSnack'
  | 'lunch'
  | 'afternoonFruit'
  | 'afternoonDairy'
  | 'afternoonSnack'
  | 'dinner'
  | 'supper'

export type DirectMealSlot = Exclude<MealSlot, 'lunch'>

export interface MealOption {
  id: string
  slot: MealSlot
  title: string
  kcal: number
  items: string[]
  tags?: string[]
  preparationUrl?: string
  preparationLabel?: string
}

export interface LunchSelection {
  starchId: string
  legumeId: string
  proteinId: string
}

export interface DayMealSelection {
  direct: Record<DirectMealSlot, string>
  lunch: LunchSelection
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
  preparationUrl?: string
  preparationLabel?: string
}

export interface MealCatalog {
  direct: Record<DirectMealSlot, MealOption[]>
  lunch: {
    starch: MealOption[]
    legume: MealOption[]
    protein: MealOption[]
  }
}

export interface MealCatalogById {
  direct: Record<DirectMealSlot, Record<string, MealOption>>
  lunch: {
    starch: Record<string, MealOption>
    legume: Record<string, MealOption>
    protein: Record<string, MealOption>
  }
}

export type LunchPart = keyof LunchSelection

export type SwapMealEquivalentParams =
  | { slot: DirectMealSlot; optionId: string }
  | { slot: 'lunch'; part: LunchPart; optionId: string }
