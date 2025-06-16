import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import Product from './pages/Product'
import Pricing from './pages/Pricing'
import HomePage from './pages/HomePage'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesContextProvider } from './contexts/CitiesContext'

function App() {
  return (
    <CitiesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesContextProvider>
  )
}

export default App
