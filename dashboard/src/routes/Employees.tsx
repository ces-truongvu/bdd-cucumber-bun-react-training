import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
import { EmployeeType, getAllEmployees } from '~/services/Employees'

export async function loader() {
  const employees: Array<EmployeeType> = await getAllEmployees()
  return { employees }
}

export function Employees() {
  const { employees } = useLoaderData() as { employees: Array<EmployeeType> }
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Grid container spacing={2} padding={'1rem'}>
      <Grid item xs={12} sm={12} md={12}>
        <TextField label='Search' variant='outlined' value={searchTerm} onChange={handleSearch} sx={{ mb: 2 }} />
      </Grid>
      {filteredEmployees.map((employee, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card sx={{ display: 'flex' }}>
            <Grid item xs={6} sm={8} md={8} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='h5'>
                    {employee.name}
                  </Typography>
                  <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {employee.title}
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item xs={6} sm={8} md={8} style={{ display: 'flex', flex: 'auto', justifyContent: 'flex-end' }}>
              <CardMedia component='img' sx={{ width: 151 }} image={employee.image} alt={employee.name} />
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
