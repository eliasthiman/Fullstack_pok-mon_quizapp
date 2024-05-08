import React, { useState, useEffect } from 'react';
//import PokefetchClassic from './APIfetch/PokefetchClassic.jsx';
//import PokefetchModern from './APIfetch/PokefetchModern.jsx';
//import Classic from './Pages/Classic.jsx';
import HomePage from './Pages/HomePage.jsx';
/*
import QuizSelectPage from './Pages/QuizSelectPage.jsx';
import { 
  createBrowserRouter,
  Route, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
*/

/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/QuizSelect" element={< QuizSelectPage />} />
      <Route path="/QuizSelect/Classic" element={<PokefetchClassic />} />
      <Route path="/QuizSelect/Modern" element={<PokefetchModern />} />
    </Route>
  )
)  
RouterProvider router={router}

*/

function App() {

  return (
    <div>
      <HomePage/>
    </div>
  )
}

export default App 


