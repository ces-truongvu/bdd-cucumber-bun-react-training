import { useAuth } from '~/providers/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import { Logout } from '@mui/icons-material'
export function AuthStatus() {
  let auth = useAuth()
  let navigate = useNavigate()

  if (!auth.token) {
    return
  }

  return (
    <>
      <Button
        onClick={() => {
          navigate('/profile')
        }}
        variant='outlined'
        sx={{ my: 1, mx: 1.5 }}
        style={{ textTransform: 'none' }}
      >
        Welcome! {auth.username}
      </Button>
      <IconButton
        onClick={() => {
          auth.signout(() => navigate('/'))
        }}
        aria-label='logout'
      >
        <Logout />
      </IconButton>
    </>
  )
}
