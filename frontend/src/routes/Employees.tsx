import { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { Grid, Breadcrumbs, Typography } from '@mui/material'
import { EmployeeType } from '~/services/EmployeeService'
import { SearchBar } from '~/components/Employee/SearchBar'
import { EmployeesList } from '~/components/Employee/EmployeesList'

export function Employees() {
  const employees = useLoaderData() as Array<EmployeeType>
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <Grid item xs={12}>
        <Breadcrumbs aria-label='breadcrumb' style={{ margin: '1rem 0px' }}>
          <Link style={{ color: 'unset', textDecoration: 'none' }} to='/'>
            Home
          </Link>
          <Typography color='text.primary'>Employees</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <SearchBar onSearchTermChange={setSearchTerm} />
        </Grid>
        <EmployeesList employees={employees} searchTerm={searchTerm} />
      </Grid>
    </>
  )
}
