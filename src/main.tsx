import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/auth.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Auth/Login.tsx'
import DashBoard from './components/DashBoard.tsx'


const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
    {
      path : "/",
      element : <Login />
    },
    {
      path : "/dashboard",
      element : <DashBoard />
    },
    {
      path : "*",
      element : <Login />
    }
  ]
  }
  
  
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
