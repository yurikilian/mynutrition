const AUTH_STORAGE_KEY = 'my_nutririon_auth_ok_v1'

const getConfiguredPasswordHash = () =>
  (import.meta.env.VITE_APP_PASSWORD_HASH ?? '').trim().toLowerCase()

export const hasPasswordConfigured = () => getConfiguredPasswordHash().length > 0

export const loadAuthState = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export const saveAuthState = (isAuthenticated: boolean) => {
  if (typeof window === 'undefined') return

  if (isAuthenticated) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    return
  }

  localStorage.removeItem(AUTH_STORAGE_KEY)
}

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

const sha256 = async (value: string) => {
  const encoded = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded)
  return toHex(hashBuffer)
}

export const validatePassword = async (password: string) => {
  const configuredHash = getConfiguredPasswordHash()
  if (!configuredHash) return false

  const inputHash = await sha256(password)
  return inputHash === configuredHash
}
