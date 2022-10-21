import './App.css';
import React from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { Layout } from './components/Layout'

function App() {
  return (
    <>
      <Routes>

        <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}/>
        
      </Routes>
    </>
  );
}

export default App;
