import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { EmployeeType } from '~/services/EmployeeService'
import { Link } from 'react-router-dom'

interface EmployeesListProps {
  employees: Array<EmployeeType>
  searchTerm: string
}

export function EmployeesList({ employees, searchTerm }: EmployeesListProps) {
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {filteredEmployees.map((employee, index) => (
        <Grid item xs={6} key={index} className='employee'>
          <Link style={{ color: 'unset', textDecoration: 'none' }} to={`/employees/${employee.id}`}>
            <Card style={{ marginBottom: 20 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='h5'>
                    {employee.name}
                  </Typography>
                  <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {employee.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component='img'
                  style={{ position: 'absolute', right: 0 }}
                  sx={{ width: 151 }}
                  image={employee.image}
                  alt={employee.name}
                />
              </Box>
            </Card>
          </Link>
        </Grid>
      ))}
    </>
  )
}
