import './App.css';
import React from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import { NotFound } from './components/NotFound';
import { Layout } from './components/Layout'
import { CustomPage } from "./components/CustomPage"

const pathsJson = [
  {
    "path": "/",
    "title": "Home"
  },
  {
    "path": "/about",
    "title": "About"
  }
]

function App() {
  return (
    <>
      <Routes>

        <Route element={<Layout/>}>
          {pathsJson.map((path, i)=>{
            return <Route path={path.path} element={<CustomPage content={path}/>}/>
          })}
        </Route>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </>
  );
}

export default App;
