import { useContext } from 'react'
import { AuthContext } from '../contexts/FakeAuthContext'

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (ctx === undefined)
    throw new Error('Auth context was used outside the AuthContextProvider.')

  return ctx
}
