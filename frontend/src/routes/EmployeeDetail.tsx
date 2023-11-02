import { useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useLoaderData } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Breadcrumbs,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  TextField,
  InputAdornment
} from '@mui/material'
import { Person, Email, Phone, House, CardMembership } from '@mui/icons-material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Link } from 'react-router-dom'
import { EmployeeType, updateEmployee } from '~/services/EmployeeService'

export function EmployeeDetail() {
  const getEmployee = useLoaderData() as EmployeeType
  const [employee, setEmployee] = useState<EmployeeType>({ ...getEmployee })
  const debounceUpdate = useDebounce(employee, 500)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleOnblur = () => {
    async function doUpdateData() {
      try {
        await updateEmployee({ ...debounceUpdate })
      } catch (error: Error | any) {
        setMessage('Unable to update')
        setOpen(true)
        throw new Error(error?.message || 'Something went wrong')
      }
    }

    doUpdateData()
  }

  return (
    <>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb' style={{ margin: '1rem 0' }}>
          <Link style={{ color: 'unset', textDecoration: 'none' }} to='/'>
            Home
          </Link>
          <Typography color='text.primary'>{employee?.name}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex', flex: 1, flexDirection: 'column', position: 'relative' }}>
          <Box sx={{ justifyContent: 'flex-start' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <List>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.name}
                      onBlur={handleOnblur}
                      onChange={(e) => {
                        setEmployee({ ...employee, name: e.target.value })
                      }}
                      variant='standard'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Person />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.title}
                      disabled={false}
                      onBlur={handleOnblur}
                      onChange={(event) => {
                        setEmployee({ ...employee, title: event.target.value })
                      }}
                      variant='standard'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <CardMembership />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.phone}
                      disabled={false}
                      onBlur={handleOnblur}
                      onChange={(event) => {
                        setEmployee({ ...employee, phone: event.target.value })
                      }}
                      variant='standard'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Phone />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.email}
                      disabled={false}
                      onBlur={handleOnblur}
                      onChange={(event) => {
                        setEmployee({ ...employee, email: event.target.value })
                      }}
                      variant='standard'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Email />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.address}
                      disabled={false}
                      onBlur={handleOnblur}
                      onChange={(event) => {
                        setEmployee({ ...employee, address: event.target.value })
                      }}
                      variant='standard'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <House />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TextField
                      value={employee?.bio}
                      disabled={false}
                      multiline
                      rows={4}
                      style={{ width: '100%' }}
                      onBlur={handleOnblur}
                      onChange={(event) => {
                        setEmployee({ ...employee, bio: event.target.value })
                      }}
                      variant='standard'
                    />
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </Box>
          <Box sx={{ justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <CardMedia component='img' sx={{ width: 151 }} image={employee?.image} alt={employee?.name} />
          </Box>
        </Card>
        <Snackbar autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open}>
          <Alert onClose={() => setOpen(false)} severity='error' sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  )
}
