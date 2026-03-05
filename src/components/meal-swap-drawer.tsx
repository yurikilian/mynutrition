import { useEffect, useState } from 'react'

import { mealCatalog } from '@/data/meal-options'
import type { DayPlan, MealSlot, SwapMealEquivalentParams } from '@/types/meal'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface MealSwapDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  slot: MealSlot
  dayPlan: DayPlan
  onSwapMeal: (params: SwapMealEquivalentParams) => void
  onShuffleSnackCombo: () => void
}

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const update = () => setMatches(mediaQuery.matches)
    update()

    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [query])

  return matches
}

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-sm font-semibold text-foreground">{children}</p>
)

export const MealSwapDrawer = ({
  open,
  onOpenChange,
  slot,
  dayPlan,
  onSwapMeal,
  onShuffleSnackCombo,
}: MealSwapDrawerProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const isLocked = dayPlan.locked[slot]

  const title =
    slot === 'breakfast'
      ? 'Trocar café da manhã'
      : slot === 'lunch'
        ? 'Trocar partes do almoço'
        : slot === 'snack'
          ? 'Trocar partes do lanche'
          : 'Trocar jantar'

  const description =
    slot === 'snack'
      ? 'Mantenha a estrutura de 410 kcal editando base, fruta e lácteo separadamente.'
      : 'Somente opções equivalentes são exibidas para preservar as calorias do horário.'

  const content = (
    <div className="space-y-4 px-4 pb-4 md:px-0 md:pb-0">
      {isLocked ? (
        <p className="rounded-md border border-accent bg-accent p-3 text-sm text-accent-foreground">
          Esta refeição está fixada. Desfixe primeiro para aplicar alterações.
        </p>
      ) : null}

      {slot === 'breakfast'
        ? mealCatalog.breakfast.map((option) => {
            const selected = dayPlan.meals.breakfastId === option.id

            return (
              <Button
                className="h-auto min-h-11 w-full justify-start whitespace-normal py-3 text-left"
                disabled={isLocked || selected}
                key={option.id}
                onClick={() => onSwapMeal({ slot: 'breakfast', optionId: option.id })}
                type="button"
                variant={selected ? 'default' : 'outline'}
              >
                <span className="block">
                  <span className="block font-medium">{option.title}</span>
                  <span className="block text-xs opacity-80">250 kcal</span>
                </span>
              </Button>
            )
          })
        : null}

      {slot === 'dinner'
        ? mealCatalog.dinner.map((option) => {
            const selected = dayPlan.meals.dinnerId === option.id

            return (
              <Button
                className="h-auto min-h-11 w-full justify-start whitespace-normal py-3 text-left"
                disabled={isLocked || selected}
                key={option.id}
                onClick={() => onSwapMeal({ slot: 'dinner', optionId: option.id })}
                type="button"
                variant={selected ? 'default' : 'outline'}
              >
                <span className="block">
                  <span className="block font-medium">{option.title}</span>
                  <span className="block text-xs opacity-80">340 kcal</span>
                </span>
              </Button>
            )
          })
        : null}

      {slot === 'lunch' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <SectionLabel>Amido</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'lunch', part: 'starchId', optionId: value })}
              value={dayPlan.meals.lunch.starchId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o amido" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.lunch.starch.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <SectionLabel>Leguminosa (2 porções)</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'lunch', part: 'legumeId', optionId: value })}
              value={dayPlan.meals.lunch.legumeId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a leguminosa" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.lunch.legume.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <SectionLabel>Proteína (200 g)</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'lunch', part: 'proteinId', optionId: value })}
              value={dayPlan.meals.lunch.proteinId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a proteína" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.lunch.protein.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : null}

      {slot === 'snack' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <SectionLabel>Base (250 kcal)</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'snack', part: 'base250', optionId: value })}
              value={dayPlan.meals.snack.baseId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a base" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.snack.base250.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <SectionLabel>Fruta (90 kcal)</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'snack', part: 'fruit90', optionId: value })}
              value={dayPlan.meals.snack.fruitId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fruta" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.snack.fruit90.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <SectionLabel>Lácteo / bebida (70 kcal)</SectionLabel>
            <Select
              disabled={isLocked}
              onValueChange={(value) => onSwapMeal({ slot: 'snack', part: 'dairy70', optionId: value })}
              value={dayPlan.meals.snack.dairyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o lácteo / bebida" />
              </SelectTrigger>
              <SelectContent>
                {mealCatalog.snack.dairy70.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <Button
            className="h-11 w-full"
            disabled={isLocked}
            onClick={onShuffleSnackCombo}
            type="button"
            variant="secondary"
          >
            Gerar nova combinação válida de 410 kcal
          </Button>
        </div>
      ) : null}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto">{content}</div>
      </DrawerContent>
    </Drawer>
  )
}
