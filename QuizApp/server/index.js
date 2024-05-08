import express from "express";
import axios from 'axios';
import cors from "cors";
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(express.static('../dist')); 

const pool = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "quizapp",  
});


/**
 *  Endpoint för registrering av användare  
 * 
 * 
 */

app.post('/register', async (req, res) => { 
  const { username, password } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const values = [username, hashedPassword]; 

      const connection = await pool.getConnection();
      const [results] = await connection.execute(sql, values);
      connection.release();

      res.json({ success: 'User registered successfully' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to register user' });
  }
});


/**
 * Endpoint för inloggning av användare
 * 
 * 
 */

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const sql = 'SELECT password FROM users WHERE username = ?';
      const values = [username];

      const connection = await pool.getConnection();
      const [results] = await connection.execute(sql, values);
      connection.release();

      if (results.length > 0) {
          const comparison = await bcrypt.compare(password, results[0].password);

          if (comparison) {
              const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
              res.json({ success: 'Logged in successfully', token });
          } else {
              res.status(401).json({ error: 'Incorrect password' });
          }
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to log in' });
  }
});

/**
 * 
 * Endpoint för att hämta information om 10 random pokémon från pokeapi
 * 
 * 
 */

app.get('/api/pokemon/info/classic/', async (req, res) => { 
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=251`); 
        const pokemonList = response.data.results;

        const sessionToken = uuidv4();

        const randomPokemonDetails = [];

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonList.length); 
            const randomPokemon = pokemonList[randomIndex];
            const pokemonDetailsResponse = await axios.get(randomPokemon.url);
            const pokemonDetails = pokemonDetailsResponse.data;
            const { sprites, name, types, id } = pokemonDetails; 
            
           const uniqueNames = new Set();
           uniqueNames.add(name);

           while (uniqueNames.size < 4) {
               const randomNameIndex = Math.floor(Math.random() * pokemonList.length);
               const randomName = pokemonList[randomNameIndex].name;
               if (randomName !== name) {
                uniqueNames.add(randomName);
            }
           }

          const shuffledNames = Array.from(uniqueNames).sort(() => Math.random() - 0.5);
      
            const simplifiedPokemon = {
                sprite: sprites.front_default,
                name: name,
                type1: types[0].type.name,
                type2: types[1] ? types[1].type.name : null,
                type3: types[2] ? types[1].type.name : null, 
                id: id,
                answers: shuffledNames
            };

            console.log(simplifiedPokemon);

            randomPokemonDetails.push(simplifiedPokemon);
        }

        const connection = await pool.getConnection();

        const sql = 'INSERT INTO game_sessions (session_token, questions) VALUES (?, ?)';
        const values = [sessionToken, JSON.stringify(randomPokemonDetails)];

        await connection.execute(sql, values); 

        connection.release();

        res.json({sessionToken: sessionToken, questions: randomPokemonDetails});
    } catch (error) {
        res.status(500).json({ error: error} ); 
    }
});



/**
 * 
 * Endpoint för att skicka in quizresultat till databasen
 * 
 */

app.post('/submit-quiz', async (req, res) => {
  const quizResult = req.body;

  const sql = 'INSERT INTO quizapp.result (name, score) VALUES (?, ?)';
  const values = [quizResult.name, quizResult.score];

  try {
    const connection = await pool.getConnection();

    const [results, fields] = await connection.execute(sql, values);

    connection.release();

    console.log('Success:', results);
    res.json({ success: 'Quiz result inserted into the database' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to insert quiz result into the database' });
  }
});



/**
 * 
 * Endpoint för att hämta quizresultat från databasen
 * 
 * 
 */

app.get('/fetch-results', async (req, res) => {
  const sql = 'SELECT Name, Score FROM result ORDER BY Score DESC'; 

  try {
    const connection = await pool.getConnection();

    const [results, fields] = await connection.execute(sql);

    connection.release();

    console.log('Success:', results);
    res.json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch quiz results from the database' });
  }
});



/**
 * 
 * Endpoint för att hämta ett existerande spel från databasen
 * 
 * 
 */

app.get('/fetch-game', async (req, res) => {
  const { sessionToken } = req.query;

  try {
      const connection = await pool.getConnection();

      const sql = 'SELECT session_token, questions FROM game_sessions WHERE session_token = ?';
      const values = [sessionToken];

      const [results] = await connection.execute(sql, values);

      connection.release();

      if (results.length > 0) {
          const { session_token, questions } = results[0];
          res.json({ sessionToken: session_token, questions: JSON.parse(questions) });
      } else { 
          res.status(404).json({ error: 'Game session not found' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch game session from the database' });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});