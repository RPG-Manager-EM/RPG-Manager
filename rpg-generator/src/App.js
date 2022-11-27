import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import ToggleColorMode from './service/temaProvedor';

import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import EditPerfil from './pages/editPerfil/editPerfil';
import PaginaDados from './pages/paginaDados/paginaDados';
import Home from './pages/home/home';
import CriarCampanha from './pages/criar-campanha/criar-campanha';

function App() {

  return (
    <ToggleColorMode>
      <Router>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/cadastro' element={<Cadastro></Cadastro>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/perfil' element={<EditPerfil></EditPerfil>}></Route> 
          <Route path='/home/jogador/dados' element={<PaginaDados></PaginaDados>}></Route>
          <Route path='/criar-campanha' element={<CriarCampanha></CriarCampanha>}></Route>
        </Routes>
      </Router>
    </ToggleColorMode>
  );
}

export default App;
