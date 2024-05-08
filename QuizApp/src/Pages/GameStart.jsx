import React, { useState } from 'react';
import axios from 'axios';
import PokefetchClassic from '../APIfetch/PokefetchClassic.jsx';
import Classic from '../Pages/Classic.jsx';

const GameStart = () => {
  const [gameCode, setGameCode] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);

  const handleStartNewGame = () => {
    setIsNewGame(true);
    setStartGame(true);
  };

  const handleStartExistingGame = async () => { 
    if (gameCode) {
      try {
        const response = await axios.get(`http://localhost:3000/fetch-game?sessionToken=${gameCode}`);
        setQuestions(response.data.questions);
        localStorage.setItem('session_token', gameCode);
        setIsNewGame(false);
        setStartGame(true);
      } catch (error) {
        console.error('Error:', error); 
      }
    }
  };

  const handleGameCodeChange = (event) => {
    setGameCode(event.target.value); 
  };

  return (
    <div>
      {startGame ? (isNewGame ? <PokefetchClassic /> : <Classic pokemonData={questions}/>) : (
        <>
          <button onClick={handleStartNewGame}>Start New Game</button>
          <input type="text" value={gameCode} onChange={handleGameCodeChange} placeholder="Enter game code" /> 
          <button onClick={handleStartExistingGame} disabled={!gameCode}>Start Existing Game</button> 
        </>
      )}
    </div> 
  );
};

export default GameStart; 