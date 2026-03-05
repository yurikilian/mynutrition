import { emptyLockedState } from '@/data/meal-options'
import type { DayPlan, WeekPlan } from '@/types/meal'

const initialDays: DayPlan[] = [
  {
    day: 1,
    meals: {
      breakfastId: 'bf_classic_coffee_toast_turkey',
      lunch: {
        starchId: 'lunch_starch_brown_rice',
        legumeId: 'lunch_legume_beans',
        proteinId: 'lunch_protein_grilled_chicken',
      },
      snack: {
        baseId: 'snack_base_tuna_sandwich',
        fruitId: 'snack_fruit_apple',
        dairyId: 'snack_dairy_light_yogurt',
      },
      dinnerId: 'dinner_soup_chicken_grains',
    },
    locked: emptyLockedState(),
  },
  {
    day: 2,
    meals: {
      breakfastId: 'bf_yogurt_cereal_amaranth',
      lunch: {
        starchId: 'lunch_starch_sweet_potato',
        legumeId: 'lunch_legume_lentils',
        proteinId: 'lunch_protein_grilled_fish',
      },
      snack: {
        baseId: 'snack_base_crepioca_ricotta',
        fruitId: 'snack_fruit_banana',
        dairyId: 'snack_dairy_skim_milk_200ml',
      },
      dinnerId: 'dinner_salad_lean_meat',
    },
    locked: emptyLockedState(),
  },
  {
    day: 3,
    meals: {
      breakfastId: 'bf_classic_coffee_toast_turkey',
      lunch: {
        starchId: 'lunch_starch_plain_pasta',
        legumeId: 'lunch_legume_chickpeas',
        proteinId: 'lunch_protein_turkey_or_chicken',
      },
      snack: {
        baseId: 'snack_base_acai_zero_granola',
        fruitId: 'snack_fruit_strawberries',
        dairyId: 'snack_dairy_light_yogurt',
      },
      dinnerId: 'dinner_omelette_salad',
    },
    locked: emptyLockedState(),
  },
  {
    day: 4,
    meals: {
      breakfastId: 'bf_yogurt_granola_amaranth',
      lunch: {
        starchId: 'lunch_starch_white_rice',
        legumeId: 'lunch_legume_lentils',
        proteinId: 'lunch_protein_lean_red_meat',
      },
      snack: {
        baseId: 'snack_base_fruit_cereal',
        fruitId: 'snack_fruit_orange',
        dairyId: 'snack_dairy_skim_milk_200ml',
      },
      dinnerId: 'dinner_eggplant_chicken_salad',
    },
    locked: emptyLockedState(),
  },
  {
    day: 5,
    meals: {
      breakfastId: 'bf_classic_coffee_toast_turkey',
      lunch: {
        starchId: 'lunch_starch_cassava',
        legumeId: 'lunch_legume_beans',
        proteinId: 'lunch_protein_grilled_fish',
      },
      snack: {
        baseId: 'snack_base_german_bread_ricotta',
        fruitId: 'snack_fruit_pear',
        dairyId: 'snack_dairy_light_yogurt',
      },
      dinnerId: 'dinner_rap10_chicken_juice',
    },
    locked: emptyLockedState(),
  },
  {
    day: 6,
    meals: {
      breakfastId: 'bf_yogurt_cereal_amaranth',
      lunch: {
        starchId: 'lunch_starch_potato',
        legumeId: 'lunch_legume_chickpeas',
        proteinId: 'lunch_protein_grilled_chicken',
      },
      snack: {
        baseId: 'snack_base_tuna_sandwich',
        fruitId: 'snack_fruit_kiwi',
        dairyId: 'snack_dairy_skim_milk_200ml',
      },
      dinnerId: 'dinner_pita_lean_filling_salad',
    },
    locked: emptyLockedState(),
  },
  {
    day: 7,
    meals: {
      breakfastId: 'bf_classic_coffee_toast_turkey',
      lunch: {
        starchId: 'lunch_starch_brown_rice',
        legumeId: 'lunch_legume_lentils',
        proteinId: 'lunch_protein_lean_red_meat',
      },
      snack: {
        baseId: 'snack_base_crepioca_ricotta',
        fruitId: 'snack_fruit_apple',
        dairyId: 'snack_dairy_light_yogurt',
      },
      dinnerId: 'dinner_veggie_souffle_salad',
    },
    locked: emptyLockedState(),
  },
]

export const initialWeekPlan: WeekPlan = {
  days: initialDays,
}

export const cloneWeekPlan = (plan: WeekPlan): WeekPlan => ({
  days: plan.days.map((day) => ({
    day: day.day,
    meals: {
      breakfastId: day.meals.breakfastId,
      lunch: {
        starchId: day.meals.lunch.starchId,
        legumeId: day.meals.lunch.legumeId,
        proteinId: day.meals.lunch.proteinId,
      },
      snack: {
        baseId: day.meals.snack.baseId,
        fruitId: day.meals.snack.fruitId,
        dairyId: day.meals.snack.dairyId,
      },
      dinnerId: day.meals.dinnerId,
    },
    locked: {
      breakfast: day.locked.breakfast,
      lunch: day.locked.lunch,
      snack: day.locked.snack,
      dinner: day.locked.dinner,
    },
  })),
})

export const getInitialDayPlan = (dayNumber: number): DayPlan => {
  const day = initialWeekPlan.days.find((item) => item.day === dayNumber)
  if (!day) {
    throw new Error(`Initial day plan not found for day ${dayNumber}`)
  }

  return cloneWeekPlan({ days: [day] }).days[0]
}
