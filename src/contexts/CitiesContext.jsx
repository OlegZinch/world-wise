import { createContext, useCallback, useEffect, useReducer } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        currentCity: {},
      }

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload }

    default:
      throw new Error('Unknow action type')
  }
}

function CitiesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { cities, isLoading, currentCity, error } = state

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' })

      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        console.error(error)
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        })
      }
    }
    fetchCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return

      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch (error) {
        console.error(error)
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city...',
        })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      console.error(error)
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...',
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' })
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      console.error(error)
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city.',
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export { CitiesContextProvider, CitiesContext }
