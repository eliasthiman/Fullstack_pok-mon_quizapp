import React, { useState, useEffect } from 'react';
import { quizResult } from '../../modules/pokeUtils.js';
import axios from 'axios';


function Classic({pokemonData}) {

  const typeStyle ={
    maxWidth: '150px',
    borderRadius: '5px',
    padding: '10px'
  }


const [pokemonQuestion, setPokemonQuestion] = useState(0);
const [answerIdx, setAnswerIdx] = useState(null);
const [theAnswer, setAnswer] = useState(null);
const [result, setResult] = useState(quizResult);  
const [showResult, setShowResult] = useState(false);
const sessionToken = localStorage.getItem('session_token'); 


let sprite, name, type1, type2, type3, answers;

if (pokemonData && pokemonData[pokemonQuestion]) {
  ({ sprite, name, type1, type2, type3, answers } = pokemonData[pokemonQuestion]);
}


useEffect(() => {
  // console.log("THE POKE DATA CLASSIC.JSX: ", pokemonData);
}, [pokemonData]);


  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if(answer === name){
      setAnswer(true);
    }
    else{
      setAnswer(false);
    }
  };

  const nextPokemon = () => {
    setAnswerIdx(null);
    
    let newResult = {...result};
    if (theAnswer) {
      newResult.score = result.score + 10;
      newResult.correctAnswers = result.correctAnswers + 1;
    } else {
      newResult.wrongAnswers = result.wrongAnswers + 1;
    }
    setResult(newResult);
  
    if (pokemonQuestion !== pokemonData.length -1) {
      setPokemonQuestion((prev) => prev + 1);
    } else {
      setPokemonQuestion(0);
      setShowResult(true);
    }
  };


  const submitQuiz = async () => {

    const name = localStorage.getItem('username');

    try {
      const response = await axios.post('http://localhost:3000/submit-quiz', { name: name, score: result.score }); 
      console.log('Success:', response.data);  
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  const onTryAgain = async () => { 
    setResult(quizResult);
    console.log(result.score);
    try {
      await submitQuiz();
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

    if (!pokemonData) {
    return (
      <div>
        <div className="card">
          <div className="App">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
    
  return (
  <div>
    <div className="card">
      <div className="App"> 
      {!showResult ? (<> 
      <div className="card">
        <div className="App">

          <h1>Pokémon Info</h1>
          <span className=''>{pokemonQuestion + 1}</span> / <span className=''>{pokemonData.length}</span> <br />
           <div className='sprite-display'>
           <img id='pokeImg' src={sprite}/>
           </div>
           <div className='types-display'>
           <h3>Type</h3>
           <p style={typeStyle} id={type1}> {type1} </p> 
            {type2 && <p style={typeStyle} id={type2}> {type2} </p>}
            {type3 && <p style={typeStyle} id={type3}> {type3} </p>}
           </div>
        </div>
    </div>
    
        <ul className='answers-list'>
          {
            answers.map((answer, index) => (
              <li 
                  onClick={() => onAnswerClick(answer, index)} 
                  key={answer}
                  className={answerIdx === index ? 'selected-answer' : null}
                  >
                  {answer}
              </li>
            ))
          }
        </ul>
        <div className='nextButton'>
          <button onClick={nextPokemon} disabled={answerIdx === null}>
            {pokemonQuestion === pokemonData.length - 1 ? "Finish" : "Next"}
          </button>   
        </div>
        </>) : <div className='result'>
            <h3>Result</h3>

            <p>
              Session token: <span>{sessionToken}</span>
            </p>
            <p>
              Total Questions: <span>{pokemonData.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Total Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Total Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={onTryAgain}> Go to Scoreboard!</button>
           </div>}
      </div>
    </div>
  </div>
  );
}

export default Classic; 