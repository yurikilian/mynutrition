import { AuthGate } from '@/components/auth-gate'
import { MealPlanPage } from '@/components/meal-plan-page'

function App() {
  return (
    <AuthGate>
      <MealPlanPage />
    </AuthGate>
  )
}

export default App
