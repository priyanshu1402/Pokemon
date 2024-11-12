
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screen/Home'
import PokemonDetail from './Screen/PokemonDetail';
import SavedPokemon from './Screen/SavedPokemon';

function App() {

  // useEffect(() => {
  //   dispatch(listPokemon())
  //   dispatch(getPokemonById())
  //   dispatch(getPokemonByType())
  //   dispatch(getPokemonEvolution())
  //   dispatch(getPokemonSpecies())
  //   dispatch(getPokemonType())
  // }, [])
  

  return (

        <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/savedpokemon" element={<SavedPokemon />} />
      </Routes>
    </Router>
  )
}

export default App
