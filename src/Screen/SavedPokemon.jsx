import { Box, List, ListItem, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function SavedPokemon() {
    const [savedPokemon, setsavedPokemon] = useState([])
    const navigate=useNavigate()

    function getNamesArray() {
        const names = Cookies.get("names");
        return names ? JSON.parse(names) : []; // Return empty array if not set
      }
      useEffect(() => {
        setsavedPokemon(getNamesArray())
      }, [])
      
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100vw'}}>
         <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>
       Saved Pokemon
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'scroll', padding: '16px' }} >
        <List>
          {savedPokemon?.map((item, index) => (
            <ListItem onClick={()=>{
                navigate(`/pokemon/${item}`)
            }} key={index} component={Paper}  sx={{ marginBottom: '8px', padding: '16px' }}>
              {item}
            </ListItem>
          ))}
        </List>
        </Box>

    </Box>
  )
}
