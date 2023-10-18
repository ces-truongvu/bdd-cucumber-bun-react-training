import { Outlet, Link } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from 'styled-components'
import { Copyright } from '~/components/Layout/Copyright'
import { AuthProvider } from '~/providers/AuthContext'
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

export function DefaultLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <AppBar
          position='static'
          color='default'
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
              <StyledLink to='/'>CES</StyledLink>
            </Typography>
            <nav>
              <StyledLink to='/'>Support</StyledLink>
            </nav>
            <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Container component='main' maxWidth='lg'>
          <CssBaseline />
          <Outlet />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </AuthProvider>
    </ThemeProvider>
  )
}
