import { createContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'auth/login':
      return { ...state, user: action.payload, isAuthenticated: true }

    case 'auth/logout':
      return { ...state, user: null, isAuthenticated: false }

    default:
      throw new Error('Unknow action type')
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { user, isAuthenticated } = state

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'auth/login', payload: FAKE_USER })
    }
  }

  function logout() {
    dispatch({ type: 'auth/logout' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContext }
