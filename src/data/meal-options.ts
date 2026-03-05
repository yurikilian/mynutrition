import type {
  DayPlan,
  MealCatalog,
  MealCatalogById,
  MealOption,
  MealSlot,
  MealSlotConfig,
  ResolvedMeal,
} from '@/types/meal'

export const mealSlotConfigs: MealSlotConfig[] = [
  { slot: 'breakfast', label: 'Café da manhã', time: '08:00', kcal: 250 },
  { slot: 'lunch', label: 'Almoço', time: '12:30', kcal: 670 },
  { slot: 'snack', label: 'Lanche', time: '16:30', kcal: 410 },
  { slot: 'dinner', label: 'Jantar', time: '20:00', kcal: 340 },
]

export const dailyKcalTarget = 1670

export const breakfastOptions: MealOption[] = [
  {
    id: 'bf_classic_coffee_toast_turkey',
    slot: 'breakfast',
    title: 'Café + pão integral + ricota + peito de peru',
    kcal: 250,
    items: [
      'Café sem açúcar (1 xícara, 150 ml)',
      '2 fatias de pão integral',
      'Creme de ricota light (1 colher de sopa, 20 g)',
      'Peito de peru (1 fatia, 20 g)',
    ],
  },
  {
    id: 'bf_yogurt_cereal_amaranth',
    slot: 'breakfast',
    title: 'Iogurte + cereal integral + amaranto',
    kcal: 250,
    items: [
      'Iogurte natural desnatado (1 pote, 170 g)',
      'Cereal integral (3 colheres de sopa, 30 g)',
      'Amaranto em flocos (1 colher de sopa, 10 g)',
    ],
  },
  {
    id: 'bf_yogurt_granola_amaranth',
    slot: 'breakfast',
    title: 'Iogurte + granola sem açúcar + amaranto',
    kcal: 250,
    items: [
      'Iogurte natural desnatado (1 pote, 170 g)',
      'Granola sem açúcar (2 colheres de sopa, 20 g)',
      'Amaranto em flocos (1 colher de sopa, 10 g)',
    ],
  },
]

export const lunchStarchOptions: MealOption[] = [
  {
    id: 'lunch_starch_brown_rice',
    slot: 'lunch',
    title: 'Arroz integral (4 colheres de sopa cheias, 120 g cozido)',
    kcal: 670,
    items: ['Arroz integral (4 colheres de sopa cheias, 120 g cozido)'],
  },
  {
    id: 'lunch_starch_white_rice',
    slot: 'lunch',
    title: 'Arroz branco (4 colheres de sopa cheias, 120 g cozido)',
    kcal: 670,
    items: ['Arroz branco (4 colheres de sopa cheias, 120 g cozido)'],
  },
  {
    id: 'lunch_starch_sweet_potato',
    slot: 'lunch',
    title: 'Batata-doce (1 unidade média, 130 g cozida)',
    kcal: 670,
    items: ['Batata-doce (1 unidade média, 130 g cozida)'],
  },
  {
    id: 'lunch_starch_potato',
    slot: 'lunch',
    title: 'Batata (1 unidade média, 140 g cozida)',
    kcal: 670,
    items: ['Batata (1 unidade média, 140 g cozida)'],
  },
  {
    id: 'lunch_starch_cassava',
    slot: 'lunch',
    title: 'Aipim (1 pedaço médio, 120 g cozido)',
    kcal: 670,
    items: ['Aipim (1 pedaço médio, 120 g cozido)'],
  },
  {
    id: 'lunch_starch_plain_pasta',
    slot: 'lunch',
    title: 'Massa simples (1 prato de sobremesa, 100 g cozida)',
    kcal: 670,
    items: ['Massa simples (1 prato de sobremesa, 100 g cozida)'],
  },
]

export const lunchLegumeOptions: MealOption[] = [
  {
    id: 'lunch_legume_beans',
    slot: 'lunch',
    title: 'Feijão (2 conchas médias, 140 g cozido)',
    kcal: 670,
    items: ['Feijão (2 conchas médias, 140 g cozido)'],
  },
  {
    id: 'lunch_legume_lentils',
    slot: 'lunch',
    title: 'Lentilha (2 conchas médias, 140 g cozida)',
    kcal: 670,
    items: ['Lentilha (2 conchas médias, 140 g cozida)'],
  },
  {
    id: 'lunch_legume_chickpeas',
    slot: 'lunch',
    title: 'Grão-de-bico (2 conchas médias, 140 g cozido)',
    kcal: 670,
    items: ['Grão-de-bico (2 conchas médias, 140 g cozido)'],
  },
]

export const lunchProteinOptions: MealOption[] = [
  {
    id: 'lunch_protein_grilled_chicken',
    slot: 'lunch',
    title: 'Frango grelhado (200 g)',
    kcal: 670,
    items: ['Frango grelhado (200 g)'],
  },
  {
    id: 'lunch_protein_grilled_fish',
    slot: 'lunch',
    title: 'Peixe grelhado (200 g)',
    kcal: 670,
    items: ['Peixe grelhado (200 g)'],
  },
  {
    id: 'lunch_protein_lean_red_meat',
    slot: 'lunch',
    title: 'Carne vermelha magra (200 g)',
    kcal: 670,
    items: ['Carne vermelha magra (200 g)'],
  },
  {
    id: 'lunch_protein_turkey_or_chicken',
    slot: 'lunch',
    title: 'Peru ou frango (200 g)',
    kcal: 670,
    items: ['Peru ou frango (200 g)'],
  },
]

export const snackBaseOptions: MealOption[] = [
  {
    id: 'snack_base_tuna_sandwich',
    slot: 'base250',
    title: 'Sanduíche integral com atum',
    kcal: 250,
    items: [
      '2 fatias de pão integral (60 g) + creme de ricota light (2 colheres de sopa, 30 g) + atum light (3 colheres de sopa, 60 g) + salada (1 xícara, 50 g)',
    ],
    preparationUrl: 'https://www.google.com/search?q=sandu%C3%ADche+integral+com+atum+receita',
    preparationLabel: 'Ver preparo do sanduíche',
  },
  {
    id: 'snack_base_crepioca_ricotta',
    slot: 'base250',
    title: 'Crepioca com ricota',
    kcal: 250,
    items: [
      'Crepioca (1 unidade média, 90 g: 1 ovo + 2 colheres de sopa de tapioca) + creme de ricota light (2 colheres de sopa, 30 g) + salada (1 xícara, 50 g)',
    ],
    preparationUrl: 'https://www.google.com/search?q=crepioca+com+ricota+receita',
    preparationLabel: 'Ver preparo da crepioca',
  },
  {
    id: 'snack_base_acai_zero_granola',
    slot: 'base250',
    title: 'Açaí zero com granola',
    kcal: 250,
    items: ['Açaí zero (1 tigela pequena, 200 g) + granola sem açúcar (2 colheres de sopa, 20 g)'],
  },
  {
    id: 'snack_base_fruit_cereal',
    slot: 'base250',
    title: 'Fruta + cereal integral',
    kcal: 250,
    items: ['Fruta picada (1 xícara, 150 g) + cereal integral (3 colheres de sopa, 30 g)'],
  },
  {
    id: 'snack_base_german_bread_ricotta',
    slot: 'base250',
    title: 'Pão alemão com ricota',
    kcal: 250,
    items: ['Pão alemão (1 unidade, 50 g) + creme de ricota light (2 colheres de sopa, 30 g)'],
  },
]

export const snackFruitOptions: MealOption[] = [
  {
    id: 'snack_fruit_apple',
    slot: 'fruit90',
    title: 'Maçã (1 unidade média, 130 g)',
    kcal: 90,
    items: ['Maçã (1 unidade média, 130 g)'],
  },
  {
    id: 'snack_fruit_banana',
    slot: 'fruit90',
    title: 'Banana (1 unidade média, 100 g)',
    kcal: 90,
    items: ['Banana (1 unidade média, 100 g)'],
  },
  {
    id: 'snack_fruit_orange',
    slot: 'fruit90',
    title: 'Laranja (1 unidade média, 180 g)',
    kcal: 90,
    items: ['Laranja (1 unidade média, 180 g)'],
  },
  {
    id: 'snack_fruit_pear',
    slot: 'fruit90',
    title: 'Pêra (1 unidade média, 130 g)',
    kcal: 90,
    items: ['Pêra (1 unidade média, 130 g)'],
  },
  {
    id: 'snack_fruit_strawberries',
    slot: 'fruit90',
    title: 'Morangos (1 xícara, 150 g)',
    kcal: 90,
    items: ['Morangos (1 xícara, 150 g)'],
  },
  {
    id: 'snack_fruit_kiwi',
    slot: 'fruit90',
    title: 'Kiwi (2 unidades pequenas, 120 g)',
    kcal: 90,
    items: ['Kiwi (2 unidades pequenas, 120 g)'],
  },
]

export const snackDairyOptions: MealOption[] = [
  {
    id: 'snack_dairy_skim_milk_200ml',
    slot: 'dairy70',
    title: '200 ml de leite desnatado',
    kcal: 70,
    items: ['200 ml de leite desnatado'],
  },
  {
    id: 'snack_dairy_light_yogurt',
    slot: 'dairy70',
    title: 'Iogurte light (1 unidade, 170 g)',
    kcal: 70,
    items: ['Iogurte light (1 unidade, 170 g)'],
  },
  {
    id: 'snack_dairy_half_skim_yogurt',
    slot: 'dairy70',
    title: 'Iogurte natural desnatado (meio pote, 85 g)',
    kcal: 70,
    items: ['Iogurte natural desnatado (meio pote, 85 g)'],
  },
  {
    id: 'snack_dairy_light_soy_milk',
    slot: 'dairy70',
    title: 'Leite de soja light (1 copo, 200 ml)',
    kcal: 70,
    items: ['Leite de soja light (1 copo, 200 ml)'],
  },
]

export const dinnerOptions: MealOption[] = [
  {
    id: 'dinner_soup_chicken_grains',
    slot: 'dinner',
    title: 'Sopa de legumes + frango + grãos',
    kcal: 340,
    items: [
      'Sopa de legumes com frango (1 prato fundo, 300 ml; frango desfiado 100 g)',
      'Mistura de grãos (1 colher de sopa, 10 g)',
    ],
    preparationUrl: 'https://www.google.com/search?q=sopa+de+legumes+com+frango+receita',
    preparationLabel: 'Ver preparo da sopa',
  },
  {
    id: 'dinner_salad_lean_meat',
    slot: 'dinner',
    title: 'Saladas + carne magra',
    kcal: 340,
    items: [
      'Saladas variadas (2 xícaras, 160 g)',
      'Carne magra (200 g, versão almoço sem amido e sem leguminosa)',
    ],
  },
  {
    id: 'dinner_omelette_salad',
    slot: 'dinner',
    title: 'Omelete de legumes + saladas',
    kcal: 340,
    items: ['Omelete de legumes com queijo (2 ovos + 30 g queijo, 180 g)', 'Saladas (2 xícaras, 160 g)'],
    preparationUrl: 'https://www.google.com/search?q=omelete+de+legumes+com+queijo+receita',
    preparationLabel: 'Ver preparo do omelete',
  },
  {
    id: 'dinner_eggplant_chicken_salad',
    slot: 'dinner',
    title: 'Berinjela recheada + saladas',
    kcal: 340,
    items: ['Berinjela recheada com frango (1/2 berinjela grande, 250 g total; frango 100 g)', 'Saladas (1 xícara, 80 g)'],
    preparationUrl: 'https://www.google.com/search?q=berinjela+recheada+com+frango+receita',
    preparationLabel: 'Ver preparo da berinjela recheada',
  },
  {
    id: 'dinner_rap10_chicken_juice',
    slot: 'dinner',
    title: 'Rap 10 + frango + suco natural',
    kcal: 340,
    items: ['Suco natural (1 copo, 200 ml)', 'Rap 10 integral (1 unidade, 40 g)', 'Frango desfiado (100 g)', 'Saladas (1 xícara, 80 g)'],
    preparationUrl: 'https://www.google.com/search?q=rap10+integral+frango+desfiado+receita',
    preparationLabel: 'Ver preparo do rap 10',
  },
  {
    id: 'dinner_pita_lean_filling_salad',
    slot: 'dinner',
    title: 'Pão sírio integral + recheio magro + saladas',
    kcal: 340,
    items: ['Pão sírio integral (1 unidade, 60 g)', 'Recheio magro (100 g)', 'Saladas (1 xícara, 80 g)'],
    preparationUrl: 'https://www.google.com/search?q=p%C3%A3o+s%C3%ADrio+integral+recheio+magro+receita',
    preparationLabel: 'Ver preparo do pão sírio recheado',
  },
  {
    id: 'dinner_veggie_souffle_salad',
    slot: 'dinner',
    title: 'Suflê de legumes + saladas',
    kcal: 340,
    items: ['Suflê de legumes (1 fatia média, 180 g)', 'Saladas (1 xícara, 80 g)'],
    preparationUrl: 'https://www.google.com/search?q=sufl%C3%AA+de+legumes+receita',
    preparationLabel: 'Ver preparo do suflê',
  },
]

export const mealCatalog: MealCatalog = {
  breakfast: breakfastOptions,
  lunch: {
    starch: lunchStarchOptions,
    legume: lunchLegumeOptions,
    protein: lunchProteinOptions,
  },
  snack: {
    base250: snackBaseOptions,
    fruit90: snackFruitOptions,
    dairy70: snackDairyOptions,
  },
  dinner: dinnerOptions,
}

const toMap = (options: MealOption[]): Record<string, MealOption> =>
  options.reduce<Record<string, MealOption>>((acc, option) => {
    acc[option.id] = option
    return acc
  }, {})

export const mealCatalogById: MealCatalogById = {
  breakfast: toMap(mealCatalog.breakfast),
  lunch: {
    starch: toMap(mealCatalog.lunch.starch),
    legume: toMap(mealCatalog.lunch.legume),
    protein: toMap(mealCatalog.lunch.protein),
  },
  snack: {
    base250: toMap(mealCatalog.snack.base250),
    fruit90: toMap(mealCatalog.snack.fruit90),
    dairy70: toMap(mealCatalog.snack.dairy70),
  },
  dinner: toMap(mealCatalog.dinner),
}

export const emptyLockedState = (): Record<MealSlot, boolean> => ({
  breakfast: false,
  lunch: false,
  snack: false,
  dinner: false,
})

const fallbackResolvedMeal = (title: string, kcal: number): ResolvedMeal => ({
  title,
  kcal,
  items: ['Opção não encontrada no catálogo'],
})

export const resolveBreakfastMeal = (breakfastId: string): ResolvedMeal => {
  const breakfast = mealCatalogById.breakfast[breakfastId]
  if (!breakfast) return fallbackResolvedMeal('Café da manhã', 250)

  return {
    title: breakfast.title,
    kcal: 250,
    items: breakfast.items,
    preparationUrl: breakfast.preparationUrl,
    preparationLabel: breakfast.preparationLabel,
  }
}

export const resolveLunchMeal = (dayPlan: DayPlan): ResolvedMeal => {
  const starch = mealCatalogById.lunch.starch[dayPlan.meals.lunch.starchId]
  const legume = mealCatalogById.lunch.legume[dayPlan.meals.lunch.legumeId]
  const protein = mealCatalogById.lunch.protein[dayPlan.meals.lunch.proteinId]

  if (!starch || !legume || !protein) return fallbackResolvedMeal('Almoço', 670)

  return {
    title: 'Prato estruturado do almoço',
    kcal: 670,
    items: [
      'Salada fresca (2 xícaras, 160 g)',
      `Amido: ${starch.title}`,
      `Leguminosa: ${legume.title}`,
      `Proteína: ${protein.title}`,
    ],
  }
}

export const resolveSnackMeal = (dayPlan: DayPlan): ResolvedMeal => {
  const base = mealCatalogById.snack.base250[dayPlan.meals.snack.baseId]
  const fruit = mealCatalogById.snack.fruit90[dayPlan.meals.snack.fruitId]
  const dairy = mealCatalogById.snack.dairy70[dayPlan.meals.snack.dairyId]

  if (!base || !fruit || !dairy) return fallbackResolvedMeal('Lanche', 410)

  return {
    title: 'Combo do lanche',
    kcal: 410,
    items: [
      `Base (250 kcal): ${base.title}`,
      `Fruta (90 kcal): ${fruit.title}`,
      `Lácteo/bebida (70 kcal): ${dairy.title}`,
    ],
    preparationUrl: base.preparationUrl,
    preparationLabel: base.preparationLabel,
  }
}

export const resolveDinnerMeal = (dinnerId: string): ResolvedMeal => {
  const dinner = mealCatalogById.dinner[dinnerId]
  if (!dinner) return fallbackResolvedMeal('Jantar', 340)

  return {
    title: dinner.title,
    kcal: 340,
    items: dinner.items,
    preparationUrl: dinner.preparationUrl,
    preparationLabel: dinner.preparationLabel,
  }
}

export const resolveMealBySlot = (dayPlan: DayPlan, slot: MealSlot): ResolvedMeal => {
  switch (slot) {
    case 'breakfast':
      return resolveBreakfastMeal(dayPlan.meals.breakfastId)
    case 'lunch':
      return resolveLunchMeal(dayPlan)
    case 'snack':
      return resolveSnackMeal(dayPlan)
    case 'dinner':
      return resolveDinnerMeal(dayPlan.meals.dinnerId)
  }
}
