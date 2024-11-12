import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, List, ListItem, Paper } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { getPokemonByType, getPokemonType, listPokemon } from '../Redux/Action/apiAction';
import { useNavigate } from 'react-router-dom';

const HorizontalScrollContainer = styled(Box)({
  display: 'flex',
  overflowX: 'scroll',
  padding: '8px 0',
  gap: '8px',
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [PokemonType, setPokemonType] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PokemonList, setPokemonList] = useState([]);
  const [limit] = useState(20);
  const offsetRef = useRef(0); // Use ref to keep track of offset
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    if (loading) return;
    setLoading(true);
    console.log('api limit, offset', limit, offsetRef.current);

    const res = await dispatch(listPokemon({ limit, offset: offsetRef.current }));
    if (res.payload?.results) {
      setPokemonList((prevList) => [...prevList, ...res.payload.results]);
      offsetRef.current += limit; // Update offset in ref
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
    console.log('listpokemon', PokemonList);
    
  }, [PokemonList]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading) {
      console.log('handleScroll limit, offset', limit, offsetRef.current);
      fetchPokemon();
    }
  };
  
  useEffect(() => {
    dispatch(getPokemonType()).then((res) => {
      setPokemonType(res.payload.results);
    });
  }, [dispatch]);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category=="All") {
      setPokemonList([])
      offsetRef.current =0
      fetchPokemon();
    }else{

      dispatch(getPokemonByType(category)).then((res) => {
        setPokemonList(res.payload.pokemon);
      });
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', width: '100vw', margin: 0, flexDirection: 'column', overflowX: 'hidden' }}>
      <AppBar position="static" sx={{ backgroundColor: '#00576C' }}>
        <Toolbar>
          <IconButton onClick={()=>{navigate('/savedpokemon')}} edge="start" color="inherit" aria-label="saved">
            <SaveIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Header
          </Typography>
        </Toolbar>
      </AppBar>

      <HorizontalScrollContainer>
          <Button
            sx={{ minWidth: '05rem' }}
            key={"all"}
            variant={selectedCategory=="All" ? 'contained' : 'outlined'}
            color={selectedCategory=="All" ? 'primary' : 'inherit'}
            onClick={() => handleCategorySelect("All")}
          >
            {"All"}
          </Button>
        {PokemonType.map((category) => (
          <Button
            sx={{ minWidth: '05rem' }}
            key={category.name}
            variant={category.name === selectedCategory ? 'contained' : 'outlined'}
            color={category.name === selectedCategory ? 'primary' : 'inherit'}
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </HorizontalScrollContainer>

      <Box sx={{ flex: 1, overflowY: 'scroll', padding: '16px' }} onScroll={handleScroll}>
        <List>
          {PokemonList?.map((item, index) => (
            <ListItem onClick={()=>{
              if (selectedCategory=="All") {
                navigate(`/pokemon/${item?.name}`)                
              }else{
                navigate(`/pokemon/${item?.pokemon?.name}`)                

              }
            }} key={index} component={Paper} sx={{ marginBottom: '8px', padding: '16px' }}>
              {selectedCategory=="All"? item?.name:item?.pokemon?.name}
            </ListItem>
          ))}
        </List>
        {loading && <p>Loading...</p>}
      </Box>
    </Box>
  );
}

export default Home;
