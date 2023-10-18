import React, { useState } from 'react'
import { TextField, Button, Box, FormControlLabel, Checkbox, Grid, Link, Avatar, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAuth } from '~/providers/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

interface LoginFormProps {}

export const Login: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('ces-user')
  const [password, setPassword] = useState('blueJeanWhiteTshirt')
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
    const loginData = {
      username,
      password
    }
    auth.signin(loginData, () => {
      navigate(from, { replace: true })
    })
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
        <Button type='button' onClick={handleSubmit} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
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
