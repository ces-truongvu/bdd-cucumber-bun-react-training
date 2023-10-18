import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { EmployeeType } from '~/services/EmployeeService'
import { SearchBar } from '~/components/Employee/SearchBar'
import { EmployeesList } from '~/components/Employee/EmployeesList'

export function Employees() {
  const employees = useLoaderData() as Array<EmployeeType>
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Grid container spacing={2} padding={'1rem'}>
      <SearchBar onSearchTermChange={setSearchTerm} />
      <EmployeesList employees={employees} searchTerm={searchTerm} />
    </Grid>
  )
}
