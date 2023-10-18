import { useLoaderData } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Breadcrumbs,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Divider
} from '@mui/material'
import { Person, Email, Phone, House, CardMembership } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { EmployeeType } from '~/services/EmployeeService'

export function EmployeeDetail() {
  const employee = useLoaderData() as EmployeeType

  return (
    <>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb' style={{ margin: '1rem 0' }}>
          <Link style={{ color: 'unset', textDecoration: 'none' }} to='/'>
            Home
          </Link>
          <Typography color='text.primary'>{employee.name}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex', flex: 1, flexDirection: 'column', position: 'relative' }}>
          <Box sx={{ justifyContent: 'flex-start' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={employee.name} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CardMembership />
                  </ListItemIcon>
                  <ListItemText primary={employee.title} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary={employee.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary={employee.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <House />
                  </ListItemIcon>
                  <ListItemText primary={employee.address} />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem>
                  <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {employee.bio}
                  </Typography>
                </ListItem>
              </List>
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
