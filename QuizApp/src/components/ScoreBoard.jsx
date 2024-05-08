import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResultsComponent() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/fetch-results')
      .then(response => setResults(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>ScoreBoard</h1>
      {results.map((result, index) => (
        <div key={index}>
          <p>Name: {result.Name} Score: {result.Score} </p>
        </div>
      ))}
    </div>
  );
}

export default ResultsComponent;