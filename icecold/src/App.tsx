import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  Route,
  Link,
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
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
