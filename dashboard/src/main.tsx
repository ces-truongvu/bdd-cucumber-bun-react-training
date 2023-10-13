import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import { App } from './App.tsx'
import { Root } from './routes/Root.tsx'
import { ErrorPage } from './routes/ErrorPage.tsx'
import { Employees, loader as employeesLoader } from './routes/Employees.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        loader: employeesLoader,
        element: <Employees />,
        index: true
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
