import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import { App } from './App.tsx'
import { DefaultLayout } from '~/components/Layout/Default.tsx'
import { Login } from '~/components/Login.tsx'
import { RequireAuth } from './providers/RequireAuth.tsx'
import { ErrorPage } from './routes/ErrorPage.tsx'
import { Employees } from './routes/Employees.tsx'
import { EmployeeDetail } from './routes/EmployeeDetail.tsx'
import { getAllEmployees, getEmployeeById } from './services/EmployeeService.ts'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        loader: async () => await getAllEmployees(),
        element: (
          <RequireAuth>
            <Employees />
          </RequireAuth>
        ),
        index: true
      },
      {
        path: '/employees/:id',
        loader: async ({ params }) => await getEmployeeById(params.id),
        element: (
          <RequireAuth>
            <EmployeeDetail />
          </RequireAuth>
        )
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
