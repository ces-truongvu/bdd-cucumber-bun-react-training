import React, { useState } from 'react'
import { TextField, Button, Box, FormControlLabel, Checkbox, Grid, Link, Avatar, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

interface LoginFormProps {}

export const Login: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('ces-user')
  const [password, setPassword] = useState('blueJeanWhiteTshirt')

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async () => {
    const loginData = {
      username,
      password
    }

    try {
      const response = await fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const responseData = await response.json()
      // Handle successful login response
      console.log('Login successful:', responseData)
    } catch (error) {
      console.error('Error logging in:', error)
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
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
        <Button type='button' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
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
