import { type FormEvent, type ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { hasPasswordConfigured, loadAuthState, saveAuthState, validatePassword } from '@/lib/auth'

interface AuthGateProps {
  children: ReactNode
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(loadAuthState)

  if (!hasPasswordConfigured()) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-xl items-center px-4 py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Configuração de acesso ausente</CardTitle>
            <CardDescription>
              O build não recebeu a variável <code>VITE_APP_PASSWORD_HASH</code>. Configure o segredo no workflow para
              habilitar autenticação.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!password.trim()) {
      toast.error('Digite a senha para continuar')
      return
    }

    setIsSubmitting(true)
    try {
      const isValid = await validatePassword(password)

      if (!isValid) {
        toast.error('Senha inválida')
        return
      }

      saveAuthState(true)
      setIsAuthenticated(true)
      setPassword('')
      toast.success('Acesso liberado')
    } catch {
      toast.error('Não foi possível validar a senha')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl items-center px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My Nutririon</CardTitle>
          <CardDescription>Área protegida. Digite a senha para acessar o plano alimentar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-card-foreground">Senha</span>
              <input
                autoComplete="current-password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite a senha"
                type="password"
                value={password}
              />
            </label>
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Validando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
