import { Box, Link, Typography } from '@mui/material'
import ErrorOutline from '@mui/icons-material/ErrorOutline'

import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error: any = useRouteError()
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Link href='/'>
        <ErrorOutline style={{ fontSize: '5rem' }} />
      </Link>
      <Typography component='h2' variant='h5'>
        Oops!
      </Typography>
      <Typography component='p'>Sorry, an unexpected error has occurred.</Typography>
      <Typography component='p'>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Box>
  )
}
