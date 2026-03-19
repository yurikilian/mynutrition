import type {
  DayPlan,
  DirectMealSlot,
  MealCatalog,
  MealCatalogById,
  MealOption,
  MealSlot,
  MealSlotConfig,
  ResolvedMeal,
} from '@/types/meal'

export const mealSlotConfigs: MealSlotConfig[] = [
  { slot: 'breakfast', label: 'Desjejum', time: '10:00', kcal: 250 },
  { slot: 'morningSnack', label: 'Lanche da manhã', time: '11:30', kcal: 150 },
  { slot: 'lunch', label: 'Almoço', time: '12:30', kcal: 670 },
  { slot: 'afternoonFruit', label: 'Lanche da tarde 1', time: '14:00', kcal: 90 },
  { slot: 'afternoonDairy', label: 'Lanche da tarde 2', time: '16:00', kcal: 130 },
  { slot: 'afternoonSnack', label: 'Lanche da tarde 3', time: '18:00', kcal: 250 },
  { slot: 'dinner', label: 'Jantar', time: '20:00', kcal: 340 },
  { slot: 'supper', label: 'Ceia', time: '23:30', kcal: 90 },
]

export const dailyKcalTarget = 1970

export const breakfastOptions: MealOption[] = [
  {
    id: 'breakfast_coffee_bread_ricotta_turkey',
    slot: 'breakfast',
    title: 'Cafe preto + pao integral + creme de ricota light + peito de peru',
    kcal: 250,
    items: [
      'Cafe preto sem acucar ou com adoçante (quantidade suficiente)',
      'Pao integral (50 g, 2 fatias)',
      'Creme de ricota light (20 g, 2 pontas de faca)',
      'Peito de peru (10 g, 1 fatia)',
    ],
  },
  {
    id: 'breakfast_yogurt_cereal_amaranth',
    slot: 'breakfast',
    title: 'Iogurte natural desnatado + cereal integral + amaranto',
    kcal: 250,
    items: [
      'Iogurte natural desnatado (200 ml, 1 copo)',
      'Cereal integral ou granola (ate 40 g, ate 1/2 xicara)',
      'Amaranto em flocos (10 g, 1 colher de sopa)',
    ],
  },
]

export const morningSnackOptions: MealOption[] = [
  {
    id: 'morning_snack_fruit_yogurt',
    slot: 'morningSnack',
    title: 'Fruta + iogurte light',
    kcal: 150,
    items: ['Fruta (1 porcao, 90 kcal)', 'Iogurte light (180 ml, 1 frasco)'],
  },
  {
    id: 'morning_snack_protein_bar',
    slot: 'morningSnack',
    title: 'Barra de cereal hiperproteica',
    kcal: 150,
    items: ['Barra de cereal hiperproteica (1 unidade, minimo 10 g de proteina)'],
  },
]

export const lunchStarchOptions: MealOption[] = [
  {
    id: 'lunch_starch_white_rice',
    slot: 'lunch',
    title: 'Arroz branco (1 porcao: 1 colher de servir ou 1/2 xicara)',
    kcal: 110,
    items: ['Arroz branco (1 porcao, 110 kcal)'],
  },
  {
    id: 'lunch_starch_brown_rice',
    slot: 'lunch',
    title: 'Arroz integral (1 porcao: 1 colher de servir ou 1/2 xicara)',
    kcal: 110,
    items: ['Arroz integral (1 porcao, 110 kcal)'],
  },
  {
    id: 'lunch_starch_mashed_potato',
    slot: 'lunch',
    title: 'Pure de batatas (1 porcao)',
    kcal: 110,
    items: ['Pure de batatas (1 porcao, 110 kcal)'],
  },
  {
    id: 'lunch_starch_pasta',
    slot: 'lunch',
    title: 'Massa comum (1 porcao)',
    kcal: 110,
    items: ['Massa comum (1 porcao, 110 kcal)'],
  },
  {
    id: 'lunch_starch_corn',
    slot: 'lunch',
    title: 'Milho (1 porcao)',
    kcal: 110,
    items: ['Milho (1 porcao, 110 kcal)'],
  },
  {
    id: 'lunch_starch_potato',
    slot: 'lunch',
    title: 'Batata pequena (1 unidade)',
    kcal: 110,
    items: ['Batata pequena (1 unidade, 110 kcal)'],
  },
  {
    id: 'lunch_starch_cassava',
    slot: 'lunch',
    title: 'Aipim (1 pedaco pequeno)',
    kcal: 110,
    items: ['Aipim (1 pedaco pequeno, 110 kcal)'],
  },
  {
    id: 'lunch_starch_sweet_potato',
    slot: 'lunch',
    title: 'Batata-doce (1 pedaco pequeno)',
    kcal: 110,
    items: ['Batata-doce (1 pedaco pequeno, 110 kcal)'],
  },
]

export const lunchLegumeOptions: MealOption[] = [
  {
    id: 'lunch_legume_beans',
    slot: 'lunch',
    title: 'Feijao (2 porcoes)',
    kcal: 220,
    items: ['Feijao (2 porcoes = 1 concha ou 1 xicara duralex)'],
  },
  {
    id: 'lunch_legume_lentils',
    slot: 'lunch',
    title: 'Lentilha (2 porcoes)',
    kcal: 220,
    items: ['Lentilha (2 porcoes = 1 concha ou 1 xicara duralex)'],
  },
  {
    id: 'lunch_legume_green_pea',
    slot: 'lunch',
    title: 'Ervilha verde (2 porcoes)',
    kcal: 220,
    items: ['Ervilha verde (2 porcoes = 1 concha ou 1 xicara duralex)'],
  },
  {
    id: 'lunch_legume_chickpeas',
    slot: 'lunch',
    title: 'Grao-de-bico (2 porcoes)',
    kcal: 220,
    items: ['Grao-de-bico (2 porcoes = 1 concha ou 1 xicara duralex)'],
  },
  {
    id: 'lunch_legume_soy',
    slot: 'lunch',
    title: 'Soja (2 porcoes)',
    kcal: 220,
    items: ['Soja (2 porcoes = 4 colheres de sopa)'],
  },
]

export const lunchProteinOptions: MealOption[] = [
  {
    id: 'lunch_protein_chicken',
    slot: 'lunch',
    title: 'Peito de frango sem pele (200 g)',
    kcal: 300,
    items: ['Peito de frango sem pele (200 g, 2 porcoes)'],
  },
  {
    id: 'lunch_protein_turkey',
    slot: 'lunch',
    title: 'Peru sem pele (200 g)',
    kcal: 300,
    items: ['Peru sem pele (200 g, 2 porcoes)'],
  },
  {
    id: 'lunch_protein_fish',
    slot: 'lunch',
    title: 'Peixe de agua salgada (200 g)',
    kcal: 300,
    items: ['Peixe de agua salgada (200 g, 2 porcoes)'],
  },
  {
    id: 'lunch_protein_tuna',
    slot: 'lunch',
    title: 'Atum em agua (1 lata)',
    kcal: 300,
    items: ['Atum em agua (1 lata, aproximadamente 2 porcoes)'],
  },
  {
    id: 'lunch_protein_salmon',
    slot: 'lunch',
    title: 'Salmao em agua (1 lata)',
    kcal: 300,
    items: ['Salmao em agua (1 lata, aproximadamente 2 porcoes)'],
  },
  {
    id: 'lunch_protein_red_meat',
    slot: 'lunch',
    title: 'Carne vermelha magra (200 g)',
    kcal: 300,
    items: ['Carne vermelha magra (200 g, 2 porcoes)'],
  },
]

export const afternoonFruitOptions: MealOption[] = [
  {
    id: 'afternoon_fruit_pineapple',
    slot: 'afternoonFruit',
    title: 'Abacaxi (2 rodelas medias)',
    kcal: 90,
    items: ['Abacaxi (2 rodelas medias, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_banana',
    slot: 'afternoonFruit',
    title: 'Banana Sta. Catarina (1 unidade)',
    kcal: 90,
    items: ['Banana Sta. Catarina (1 unidade, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_orange',
    slot: 'afternoonFruit',
    title: 'Laranja media (1 unidade)',
    kcal: 90,
    items: ['Laranja media (1 unidade, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_apple',
    slot: 'afternoonFruit',
    title: 'Maca media (1 unidade)',
    kcal: 90,
    items: ['Maca media (1 unidade, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_kiwi',
    slot: 'afternoonFruit',
    title: 'Kiwi grande (2 unidades)',
    kcal: 90,
    items: ['Kiwi grande (2 unidades, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_strawberry',
    slot: 'afternoonFruit',
    title: 'Morangos medios (10 unidades)',
    kcal: 90,
    items: ['Morangos medios (10 unidades, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_pear',
    slot: 'afternoonFruit',
    title: 'Pera pequena (1 unidade)',
    kcal: 90,
    items: ['Pera pequena (1 unidade, 1 porcao)'],
  },
  {
    id: 'afternoon_fruit_fruit_salad',
    slot: 'afternoonFruit',
    title: 'Salada de frutas (1/2 concha)',
    kcal: 90,
    items: ['Salada de frutas (1/2 concha, 1 porcao)'],
  },
]

export const afternoonDairyOptions: MealOption[] = [
  {
    id: 'afternoon_dairy_yogurt',
    slot: 'afternoonDairy',
    title: 'Iogurte (250 ml, 1 frasco)',
    kcal: 130,
    items: ['Iogurte (250 ml, 1 frasco)'],
  },
  {
    id: 'afternoon_dairy_natural_whey',
    slot: 'afternoonDairy',
    title: 'Bebida lactea Natural Whey Verde Campo (250 ml)',
    kcal: 130,
    items: ['Bebida lactea Natural Whey Verde Campo (250 ml, 1 frasco)'],
  },
]

export const afternoonSnackOptions: MealOption[] = [
  {
    id: 'afternoon_snack_tuna_sandwich',
    slot: 'afternoonSnack',
    title: 'Sanduiche integral com creme de ricota, atum light e saladas',
    kcal: 250,
    items: [
      'Pao integral (50 g, 2 fatias)',
      'Creme de ricota light (20 g, 2 pontas de faca)',
      'Atum light (55 g, 1/2 lata)',
      'Saladas (a vontade)',
    ],
    preparationUrl: 'https://www.google.com/search?q=sanduiche+integral+atum+creme+de+ricota+receita',
    preparationLabel: 'Ver preparo do sanduiche',
  },
  {
    id: 'afternoon_snack_crepioca',
    slot: 'afternoonSnack',
    title: 'Crepioca com creme de ricota light e saladas',
    kcal: 250,
    items: [
      'Farinha de tapioca (30 g, 2 colheres de sopa cheias)',
      'Ovo (2 unidades)',
      'Creme de ricota light (1 ponta de faca)',
      'Saladas (a vontade)',
    ],
    preparationUrl: 'https://www.google.com/search?q=crepioca+com+creme+de+ricota+receita',
    preparationLabel: 'Ver preparo da crepioca',
  },
  {
    id: 'afternoon_snack_acai_granola',
    slot: 'afternoonSnack',
    title: 'Acai zero acucar + granola',
    kcal: 250,
    items: ['Acai zero acucar Frooty (6 colheres de sopa)', 'Granola (2 colheres de sopa)'],
  },
  {
    id: 'afternoon_snack_fruit_cereal',
    slot: 'afternoonSnack',
    title: 'Fruta + cereal integral',
    kcal: 250,
    items: ['Fruta (1 porcao)', 'Cereal integral (1 porcao)'],
  },
  {
    id: 'afternoon_snack_german_bread',
    slot: 'afternoonSnack',
    title: 'Pao alemao com creme de ricota light',
    kcal: 250,
    items: ['Pao alemao Vollkorn brot (2 fatias)', 'Creme de ricota light (1 ponta de faca)'],
  },
]

export const dinnerOptions: MealOption[] = [
  {
    id: 'dinner_vegetable_soup',
    slot: 'dinner',
    title: 'Sopa de legumes com carne, frango ou ovo + mistura de graos',
    kcal: 340,
    items: [
      'Sopa de legumes (250 ml, 1 prato fundo)',
      'Proteina: carne, frango ou ovo (aprox. 120 g ou 2 unidades)',
      'Mistura de graos (1 colher de sopa)',
    ],
    preparationUrl: 'https://www.google.com/search?q=sopa+de+legumes+com+frango+receita',
    preparationLabel: 'Ver preparo da sopa',
  },
  {
    id: 'dinner_lunch_without_starch_legume',
    slot: 'dinner',
    title: 'Saladas + carne magra (versao do almoco sem amido e leguminosa)',
    kcal: 340,
    items: ['Saladas cruas ou cozidas (a vontade)', 'Carne magra (200 g, 2 porcoes)'],
  },
  {
    id: 'dinner_omelette',
    slot: 'dinner',
    title: 'Omelete de legumes com queijo + saladas + sobremesa',
    kcal: 340,
    items: [
      'Omelete de legumes com queijo (3 ovos + legumes a vontade + atum ou salmao light)',
      'Saladas a vontade',
      'Sobremesa (1 porcao)',
    ],
    preparationUrl: 'https://www.google.com/search?q=omelete+de+legumes+com+queijo+receita',
    preparationLabel: 'Ver preparo do omelete',
  },
  {
    id: 'dinner_stuffed_eggplant_zucchini',
    slot: 'dinner',
    title: 'Berinjela ou abobrinha recheada e gratinada + saladas',
    kcal: 340,
    items: [
      'Berinjela ou abobrinha recheada com carne ou frango (2 metades grandes)',
      'Saladas cruas e cozidas (a vontade)',
    ],
    preparationUrl: 'https://www.google.com/search?q=berinjela+recheada+com+frango+receita',
    preparationLabel: 'Ver preparo da berinjela recheada',
  },
  {
    id: 'dinner_rap10',
    slot: 'dinner',
    title: 'Suco natural + Rap 10 integral + saladas',
    kcal: 340,
    items: [
      'Suco natural de maracuja ou limao (200 ml, 1 copo)',
      'Rap 10 integral (33 g, 1 disco)',
      'Salmao, atum ou frango desfiado (2 colheres de sopa)',
      'Saladas cruas ou cozidas (a vontade)',
    ],
    preparationUrl: 'https://www.google.com/search?q=rap10+integral+frango+receita',
    preparationLabel: 'Ver preparo do rap 10',
  },
  {
    id: 'dinner_pita_sandwich',
    slot: 'dinner',
    title: 'Sanduiche de pao sirio integral + saladas',
    kcal: 340,
    items: [
      'Pao sirio integral (1 unidade)',
      'Ovo mexido, carne moida ou atum (2 unidades ou 2 colheres de sopa)',
      'Kas schmier, cottage ou creme de ricota (20 g, 1 colher de sopa)',
      'Saladas cruas ou cozidas (a vontade)',
    ],
    preparationUrl: 'https://www.google.com/search?q=pao+sirio+integral+recheado+receita',
    preparationLabel: 'Ver preparo do pao sirio',
  },
  {
    id: 'dinner_vegetable_souffle',
    slot: 'dinner',
    title: 'Sufle de legumes + saladas + sobremesa',
    kcal: 340,
    items: [
      'Sufle de legumes (cenoura, espinafre ou couve-flor; 1 xicara cheia)',
      'Saladas cruas ou cozidas (a vontade)',
      'Sobremesa (1 porcao)',
    ],
    preparationUrl: 'https://www.google.com/search?q=sufle+de+legumes+receita',
    preparationLabel: 'Ver preparo do sufle',
  },
]

export const supperOptions: MealOption[] = [
  {
    id: 'supper_yogurt_cocoa_nibs',
    slot: 'supper',
    title: 'Iogurte desnatado + nibs de cacau',
    kcal: 90,
    items: ['Iogurte desnatado (100 ml)', 'Nibs de cacau (1 colher de sobremesa)'],
  },
  {
    id: 'supper_dessert_portion',
    slot: 'supper',
    title: 'Sobremesa (1 porcao)',
    kcal: 90,
    items: ['Sobremesa (1 porcao, conforme lista de substitutos do plano)'],
  },
  {
    id: 'supper_tapioca_biscuits',
    slot: 'supper',
    title: 'Biscoito de tapioca',
    kcal: 90,
    items: ['Biscoito de tapioca Fhom (16 biscoitos)'],
  },
  {
    id: 'supper_acai_zero',
    slot: 'supper',
    title: 'Acai zero + granola',
    kcal: 90,
    items: ['Acai zero (200 g, 1 pote)', 'Granola (1 colher de sopa)'],
  },
]

export const mealCatalog: MealCatalog = {
  direct: {
    breakfast: breakfastOptions,
    morningSnack: morningSnackOptions,
    afternoonFruit: afternoonFruitOptions,
    afternoonDairy: afternoonDairyOptions,
    afternoonSnack: afternoonSnackOptions,
    dinner: dinnerOptions,
    supper: supperOptions,
  },
  lunch: {
    starch: lunchStarchOptions,
    legume: lunchLegumeOptions,
    protein: lunchProteinOptions,
  },
}

const toMap = (options: MealOption[]): Record<string, MealOption> =>
  options.reduce<Record<string, MealOption>>((acc, option) => {
    acc[option.id] = option
    return acc
  }, {})

export const mealCatalogById: MealCatalogById = {
  direct: {
    breakfast: toMap(mealCatalog.direct.breakfast),
    morningSnack: toMap(mealCatalog.direct.morningSnack),
    afternoonFruit: toMap(mealCatalog.direct.afternoonFruit),
    afternoonDairy: toMap(mealCatalog.direct.afternoonDairy),
    afternoonSnack: toMap(mealCatalog.direct.afternoonSnack),
    dinner: toMap(mealCatalog.direct.dinner),
    supper: toMap(mealCatalog.direct.supper),
  },
  lunch: {
    starch: toMap(mealCatalog.lunch.starch),
    legume: toMap(mealCatalog.lunch.legume),
    protein: toMap(mealCatalog.lunch.protein),
  },
}

export const emptyLockedState = (): Record<MealSlot, boolean> => ({
  breakfast: false,
  morningSnack: false,
  lunch: false,
  afternoonFruit: false,
  afternoonDairy: false,
  afternoonSnack: false,
  dinner: false,
  supper: false,
})

const fallbackResolvedMeal = (title: string, kcal: number): ResolvedMeal => ({
  title,
  kcal,
  items: ['Opcao nao encontrada no catalogo'],
})

export const resolveDirectMeal = (slot: DirectMealSlot, optionId: string): ResolvedMeal => {
  const option = mealCatalogById.direct[slot][optionId]
  const config = mealSlotConfigs.find((item) => item.slot === slot)

  if (!option) {
    return fallbackResolvedMeal(config?.label ?? 'Refeicao', config?.kcal ?? 0)
  }

  return {
    title: option.title,
    kcal: option.kcal,
    items: option.items,
    preparationUrl: option.preparationUrl,
    preparationLabel: option.preparationLabel,
  }
}

export const resolveLunchMeal = (dayPlan: DayPlan): ResolvedMeal => {
  const starch = mealCatalogById.lunch.starch[dayPlan.meals.lunch.starchId]
  const legume = mealCatalogById.lunch.legume[dayPlan.meals.lunch.legumeId]
  const protein = mealCatalogById.lunch.protein[dayPlan.meals.lunch.proteinId]

  if (!starch || !legume || !protein) return fallbackResolvedMeal('Almoco', 670)

  return {
    title: 'Prato estruturado do almoco',
    kcal: 670,
    items: [
      'Saladas cruas ou cozidas (a vontade)',
      `Amido: ${starch.title}`,
      `Leguminosa: ${legume.title}`,
      `Carne magra: ${protein.title}`,
    ],
  }
}

export const resolveMealBySlot = (dayPlan: DayPlan, slot: MealSlot): ResolvedMeal => {
  if (slot === 'lunch') return resolveLunchMeal(dayPlan)
  return resolveDirectMeal(slot, dayPlan.meals.direct[slot])
}
