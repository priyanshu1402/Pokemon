import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listPokemon = createAsyncThunk('api/listPokemon', async ({limit, offset}) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });
export const getPokemonById = createAsyncThunk('api/getPokemonById', async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });
export const getPokemonType = createAsyncThunk('api/getPokemonType', async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });
export const getPokemonByType = createAsyncThunk('api/getPokemonByType', async (name) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${name}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });
export const getPokemonEvolution = createAsyncThunk('api/getPokemonEvolution', async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });
export const getPokemonSpecies = createAsyncThunk('api/getPokemonSpecies', async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data; // Return the data directly
    } catch (error) {
      console.error('Error:', error);
    }
  });