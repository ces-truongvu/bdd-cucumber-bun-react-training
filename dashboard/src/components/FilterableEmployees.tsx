import { useState } from 'react'
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { EmployeeType } from '~/services/Employees'
import { EmployeeItem } from '~/components/EmployeeItem'

export const FilterableEmployees = ({ data }: { data: Array<EmployeeType> }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredData = data.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <Box>
      {/* <TextField label='Search' variant='outlined' value={searchTerm} onChange={handleSearch} sx={{ mb: 2 }} /> */}
      {/* <Grid container spacing={2}> */}
      {filteredData.map((employee, index) => {
        return <EmployeeItem key={index} data={employee} />
      })}
      {/* </Grid> */}
    </Box>
  )
}
