
import React, { useState } from 'react';
import GameStart from './GameStart.jsx';

function QuizSelectPage() {

    const [quizType, setQuizType] = useState("");

    function selectClassicQuiz() {
        setQuizType('classic');
    }

    if (quizType === 'classic') {
        return <GameStart/>
    }

    return (<div> 
        <div>
            Logged in as: {localStorage.getItem('username')}
        </div>
        <div className="card">
            <div className="app">
                <h2>Pokémon Classics: Generation I & II</h2>
                <h3>251 Pokémon</h3>
                <button onClick={selectClassicQuiz}> Select</button> 
            </div>
        </div>
    </div>);
   
}

export default QuizSelectPage;