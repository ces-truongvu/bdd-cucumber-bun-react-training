import { ChangeEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useDebounce } from '@uidotdev/usehooks'

export function SearchBar({ onSearchTermChange }: { onSearchTermChange(updatedText: string): void }) {
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 300)

  useEffect(() => {
    onSearchTermChange(debounceQuery)
  }, [debounceQuery, onSearchTermChange])

  return (
    <>
      <TextField
        label='Search'
        variant='outlined'
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
    </>
  )
}
