import { useContext } from 'react'
import { CitiesContext } from '../contexts/CitiesContext'

function useCities() {
  const ctx = useContext(CitiesContext)
  if (ctx === undefined)
    throw new Error(
      'Cities context was used outside the CitiesContextProvider.'
    )

  return ctx
}

export default useCities
