import React, { useState, useEffect } from 'react';
import Classic from '../Pages/Classic.jsx';
import axios from 'axios';

function PokefetchClassic(){
  console.log('Rendering PokefetchClassic'); 
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getPokemonData = async () => { 
      try {
        const response = await axios.get(`http://localhost:3000/api/pokemon/info/classic`);
        setPokemonData(response.data.questions); 
        console.log("THE DATA POKEFETCH.JSX:" , response.data.questions);
        localStorage.setItem('session_token', response.data.sessionToken);  
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching Pokémon data:', error); 
      }
    };

    getPokemonData();
  }, []); 

  if (isLoading) { // Add this block
    return <div>Loading...</div>;
  }

  return (pokemonData.length > 0 && <Classic pokemonData={pokemonData}/>);  
}
  
export default PokefetchClassic;