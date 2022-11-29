import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material'
import Personagem from '../personagem/personagem';

import PersonagemService from '../../service/personagem';

const Personagens = () => {
  const navigate = useNavigate();

  const [listaPersonagens, setListaPersonagens] = useState([]);

  useEffect(() => {
    PersonagemService.getByUsuario(parseInt(localStorage.getItem("userId"))).then((response) => {
      setListaPersonagens(response);
    })
  }, []);

  return (
    <Box className='mt-6'>
      <Box className='w-full flex justify-between' sx={{ marginBottom: '16px' }} >
        <Box className='px-2 py-1 w-1/3 border outline-none' component='input' placeholder="Buscar personagem" />
        <Button onClick={() => navigate("/criar-personagem")} variant='contained' color='tertiary' disableElevation>Novo Personagem</Button>
      </Box>

      {listaPersonagens.map((personagem, index) => {
        return <Personagem key={index} personagem={personagem}></Personagem>
      })}
    </Box>
  )
}

export default Personagens