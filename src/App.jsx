import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Error from './components/Error/Error';
import AuthContextProvider from './components/Context/AuthContext';
import Guard from './components/Guard/Guard';
import AuthGuard from './components/AuthGuard/AuthGuard';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Guard><Cart /> </Guard> },
      { path: 'categories', element: <Guard><Categories /></Guard> },
      { path: 'brands', element: <Guard><Brands /></Guard> },
      { path: 'products', element: <Guard><Products /></Guard> },
      { path: 'details/:id', element: <Guard><ProductDetails /></Guard> },
      { path: 'login', element: <AuthGuard><Login /></AuthGuard> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Error /> },
    ]
  }
])

export default function App() {
  return <>
    <AuthContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
          <Toaster position="bottom-right"
            reverseOrder={false} />
        </QueryClientProvider>
      </CartContextProvider>
    </AuthContextProvider>



  </>
}
