import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Copyright } from './components/Layout/Copyright'
import './App.css'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <nav>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Features
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Enterprise
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Support
            </Link>
          </nav>
          <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Outlet />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
