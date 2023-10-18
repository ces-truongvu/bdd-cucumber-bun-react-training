import { ChangeEvent, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDebounce } from '@uidotdev/usehooks'

export function SearchBar({ onSearchTermChange }: { onSearchTermChange(updatedText: string): void }) {
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 300)

  useEffect(() => {
    onSearchTermChange(debounceQuery)
  }, [debounceQuery, onSearchTermChange])

  return (
    <Grid item xs={12} sm={12} md={12}>
      <TextField
        label='Search'
        variant='outlined'
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Grid>
  )
}
