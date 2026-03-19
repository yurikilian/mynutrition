import { emptyLockedState } from '@/data/meal-options'
import type { DayPlan, WeekPlan } from '@/types/meal'

const initialDays: DayPlan[] = [
  {
    day: 1,
    meals: {
      direct: {
        breakfast: 'breakfast_coffee_bread_ricotta_turkey',
        morningSnack: 'morning_snack_fruit_yogurt',
        afternoonFruit: 'afternoon_fruit_apple',
        afternoonDairy: 'afternoon_dairy_natural_whey',
        afternoonSnack: 'afternoon_snack_tuna_sandwich',
        dinner: 'dinner_vegetable_soup',
        supper: 'supper_yogurt_cocoa_nibs',
      },
      lunch: {
        starchId: 'lunch_starch_brown_rice',
        legumeId: 'lunch_legume_beans',
        proteinId: 'lunch_protein_chicken',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 2,
    meals: {
      direct: {
        breakfast: 'breakfast_yogurt_cereal_amaranth',
        morningSnack: 'morning_snack_protein_bar',
        afternoonFruit: 'afternoon_fruit_banana',
        afternoonDairy: 'afternoon_dairy_yogurt',
        afternoonSnack: 'afternoon_snack_crepioca',
        dinner: 'dinner_lunch_without_starch_legume',
        supper: 'supper_dessert_portion',
      },
      lunch: {
        starchId: 'lunch_starch_sweet_potato',
        legumeId: 'lunch_legume_lentils',
        proteinId: 'lunch_protein_fish',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 3,
    meals: {
      direct: {
        breakfast: 'breakfast_coffee_bread_ricotta_turkey',
        morningSnack: 'morning_snack_fruit_yogurt',
        afternoonFruit: 'afternoon_fruit_orange',
        afternoonDairy: 'afternoon_dairy_natural_whey',
        afternoonSnack: 'afternoon_snack_acai_granola',
        dinner: 'dinner_omelette',
        supper: 'supper_tapioca_biscuits',
      },
      lunch: {
        starchId: 'lunch_starch_pasta',
        legumeId: 'lunch_legume_chickpeas',
        proteinId: 'lunch_protein_turkey',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 4,
    meals: {
      direct: {
        breakfast: 'breakfast_yogurt_cereal_amaranth',
        morningSnack: 'morning_snack_protein_bar',
        afternoonFruit: 'afternoon_fruit_pear',
        afternoonDairy: 'afternoon_dairy_yogurt',
        afternoonSnack: 'afternoon_snack_fruit_cereal',
        dinner: 'dinner_stuffed_eggplant_zucchini',
        supper: 'supper_acai_zero',
      },
      lunch: {
        starchId: 'lunch_starch_white_rice',
        legumeId: 'lunch_legume_green_pea',
        proteinId: 'lunch_protein_red_meat',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 5,
    meals: {
      direct: {
        breakfast: 'breakfast_coffee_bread_ricotta_turkey',
        morningSnack: 'morning_snack_fruit_yogurt',
        afternoonFruit: 'afternoon_fruit_strawberry',
        afternoonDairy: 'afternoon_dairy_natural_whey',
        afternoonSnack: 'afternoon_snack_german_bread',
        dinner: 'dinner_rap10',
        supper: 'supper_yogurt_cocoa_nibs',
      },
      lunch: {
        starchId: 'lunch_starch_cassava',
        legumeId: 'lunch_legume_soy',
        proteinId: 'lunch_protein_tuna',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 6,
    meals: {
      direct: {
        breakfast: 'breakfast_yogurt_cereal_amaranth',
        morningSnack: 'morning_snack_protein_bar',
        afternoonFruit: 'afternoon_fruit_kiwi',
        afternoonDairy: 'afternoon_dairy_yogurt',
        afternoonSnack: 'afternoon_snack_tuna_sandwich',
        dinner: 'dinner_pita_sandwich',
        supper: 'supper_dessert_portion',
      },
      lunch: {
        starchId: 'lunch_starch_potato',
        legumeId: 'lunch_legume_beans',
        proteinId: 'lunch_protein_salmon',
      },
    },
    locked: emptyLockedState(),
  },
  {
    day: 7,
    meals: {
      direct: {
        breakfast: 'breakfast_coffee_bread_ricotta_turkey',
        morningSnack: 'morning_snack_fruit_yogurt',
        afternoonFruit: 'afternoon_fruit_fruit_salad',
        afternoonDairy: 'afternoon_dairy_natural_whey',
        afternoonSnack: 'afternoon_snack_crepioca',
        dinner: 'dinner_vegetable_souffle',
        supper: 'supper_tapioca_biscuits',
      },
      lunch: {
        starchId: 'lunch_starch_corn',
        legumeId: 'lunch_legume_lentils',
        proteinId: 'lunch_protein_chicken',
      },
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
      direct: {
        breakfast: day.meals.direct.breakfast,
        morningSnack: day.meals.direct.morningSnack,
        afternoonFruit: day.meals.direct.afternoonFruit,
        afternoonDairy: day.meals.direct.afternoonDairy,
        afternoonSnack: day.meals.direct.afternoonSnack,
        dinner: day.meals.direct.dinner,
        supper: day.meals.direct.supper,
      },
      lunch: {
        starchId: day.meals.lunch.starchId,
        legumeId: day.meals.lunch.legumeId,
        proteinId: day.meals.lunch.proteinId,
      },
    },
    locked: {
      breakfast: day.locked.breakfast,
      morningSnack: day.locked.morningSnack,
      lunch: day.locked.lunch,
      afternoonFruit: day.locked.afternoonFruit,
      afternoonDairy: day.locked.afternoonDairy,
      afternoonSnack: day.locked.afternoonSnack,
      dinner: day.locked.dinner,
      supper: day.locked.supper,
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
