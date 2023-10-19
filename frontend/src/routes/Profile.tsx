import { Grid, Breadcrumbs, Typography, Card, CardMedia, CardContent, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '~/providers/AuthContext'

export function Profile() {
  const employee = useAuth()

  return (
    <>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb' style={{ margin: '1rem 0' }}>
          <Link style={{ color: 'unset', textDecoration: 'none' }} to='/'>
            Home
          </Link>
          <Typography color='text.primary'>{employee.username}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex', flex: 1, flexDirection: 'column', position: 'relative' }}>
          <Box sx={{ justifyContent: 'flex-start' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='h1' gutterBottom>
                Underconstruction
              </Typography>
              <Typography variant='h2' gutterBottom>
                Underconstruction
              </Typography>
              <Typography variant='h3' gutterBottom>
                Underconstruction
              </Typography>
              <Typography variant='h4' gutterBottom>
                Underconstruction
              </Typography>
              <Typography variant='h5' gutterBottom>
                Underconstruction
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <CardMedia component='img' sx={{ width: 151 }} image={employee.image} alt={employee.name} />
          </Box>
        </Card>
      </Grid>
    </>
  )
}
