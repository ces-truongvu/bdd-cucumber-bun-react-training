import React from 'react'
import { Link } from 'react-router-dom'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CardMedia from '@mui/material/CardMedia'
import { EmployeeType } from '~/services/Employees'

export const EmployeeItem = ({ data }: { data: EmployeeType }) => {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <CardMedia
            component='img'
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={data.image}
            alt={data.name}
          />
        </ListItemIcon>
        <ListItemText primary={data.name} />
      </ListItemButton>
    </React.Fragment>
  )
}
