import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@mui/material';

import ItemListModel from '../item-list-model/item-list-model';

const Personagem = (props) => {

    const navigate = useNavigate();
    const personagem = props.personagem;

    const verDetalhes = () => {
        localStorage.setItem('personagemAtual', personagem)
        navigate('/detalhes-personagem');
      }

    return (
        <ItemListModel onClick={() => verDetalhes}>
            <Typography fontSize='22px' color='text.white'>{personagem.nome}</Typography>
            {personagem.campanha != null ?
                <Typography fontSize='22px' color='text.white'>{personagem.campanha.nome}</Typography> :
                <Typography fontSize='22px' color='text.white'>Sem Campanha</Typography>
            }
            <Typography fontSize='22px' color='text.white'>Vida: {personagem.vida}</Typography>
            <Typography fontSize='22px' color='text.white'>Mana: {personagem.mana}</Typography>
            <Typography fontSize='22px' color='text.white'>Nível {personagem.nivel}</Typography>
        </ItemListModel>
    )
}

export default Personagem