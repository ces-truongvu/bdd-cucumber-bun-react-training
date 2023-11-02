import React, { useState } from 'react'
import { TextField, Box, FormControlLabel, Checkbox, Grid, Link, Avatar, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SendIcon from '@mui/icons-material/SendOutlined'
import { useAuth } from '~/providers/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

export const Login: React.FC = () => {
  const [username, setUsername] = useState('ces-user')
  const [password, setPassword] = useState('blueJeanWhiteTshirt')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const loginData = {
        username,
        password
      }
      await auth.signin(loginData)
      navigate(from, { replace: true })
    } catch (error: Error | any) {
      setMessage('Unable to sign in')
      setOpen(true)

      setTimeout(() => setLoading(false), 500)
      throw new Error(error?.message)
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Snackbar autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open}>
        <Alert onClose={() => setOpen(false)} severity='error' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='username'
          autoFocus
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={handlePasswordChange}
        />
        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
        <LoadingButton
          fullWidth
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition='end'
          variant='contained'
        >
          <span>Sign In</span>
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
