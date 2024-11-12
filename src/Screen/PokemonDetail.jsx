import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPokemonById, getPokemonEvolution, getPokemonSpecies } from '../Redux/Action/apiAction';
import { useDispatch } from 'react-redux';
import { Box, Typography, Divider, Button } from '@mui/material';
import Cookies from 'js-cookie';

export default function PokemonDetail() {
    const { id } = useParams();
    const dispatch=useDispatch()
    const [PokemonDetail, setPokemonDetail] = useState({})
    const [PokemonEvolution, setPokemonEvolution] = useState({})
    const [PokemonSpecies, setPokemonSpecies] = useState({})
    const [Saved, setSaved] = useState(false)



    function saveNamesArray(namesArray) {
      Cookies.set("names", JSON.stringify(namesArray), { expires: 7 }); // Store for 7 days
  }
    
  function addNameToCookieArray(name) {
    const namesArray = getNamesArray();
    if (namesArray.includes(name)) {
        console.log(`"${name}" already exists in the array.`);
    } else {
        namesArray.push(name);
        saveNamesArray(namesArray);
        setSaved(true)
        console.log(`Added "${name}" to the names array.`);
    }
}

function getNamesArray() {
  const names = Cookies.get("names");
  return names ? JSON.parse(names) : []; // Return empty array if not set
}
  useEffect(() => {
    dispatch(getPokemonById(id)).then((res)=>{
        console.log(res.payload.id);
        setPokemonDetail(res.payload)
        dispatch(getPokemonEvolution(res.payload.id)).then((res)=>{
            setPokemonEvolution(res.payload)
        })
        
    })
    dispatch(getPokemonSpecies(id)).then((res)=>{

        setPokemonSpecies(res.payload)
    })
  }, [])
    
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100vw'}}>
      <Button
      onClick={()=>{
        addNameToCookieArray(id)
  }
      }>
        {Saved||getNamesArray().includes(id)?'Pokemon Saved': 'save Pokemon'}
      </Button>
    <Box
      sx={{
        maxWidth: '300px',
        padding: '20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        display:'flex',
        flexDirection:'column',
        alignSelf:'center'
      }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        Pokemon Details
      </Typography>

      <Divider sx={{ marginBottom: '16px' }} />

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
          Name:
        </Typography>
        <Typography variant="body1" sx={{ color: '#333' }}>
          {PokemonDetail.name || 'N/A'}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
          Weight:
        </Typography>
        <Typography variant="body1" sx={{ color: '#333' }}>
          {PokemonDetail.weight || 'N/A'}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
          Height:
        </Typography>
        <Typography variant="body1" sx={{ color: '#333' }}>
          {PokemonDetail.height || 'N/A'}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
          Abilities:
        </Typography>
        {PokemonDetail?.abilities?.length > 0 ? (
          PokemonDetail.abilities.map((item, index) => (
            <Typography key={index} variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
              • {item.ability.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
            None
          </Typography>
        )}
      </Box>
    </Box>
    <Box
      sx={{
        maxWidth: '300px',
        padding: '20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        Pokemon Species
      </Typography>

      <Divider sx={{ marginBottom: '16px' }} />

      

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
        varieties:
        </Typography>
        {PokemonSpecies?.varieties?.length > 0 ? (
          PokemonSpecies?.varieties?.map((item, index) => (
            <Typography key={index} variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
              • {item.pokemon.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
            None
          </Typography>
        )}
      </Box>
    </Box>
    <Box
      sx={{
        maxWidth: '300px',
        padding: '20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        Pokemon Evolution
      </Typography>

      <Divider sx={{ marginBottom: '16px' }} />

      

      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
        evolves_to:
        </Typography>
        {PokemonEvolution?.chain?.evolves_to?.length > 0 ? (
          PokemonEvolution?.chain?.evolves_to?.map((item, index) => (
            <Typography key={index} variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
              • {item.species.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#333', marginLeft: '8px' }}>
            None
          </Typography>
        )}
      </Box>
    </Box>
    </Box>
  )
}
