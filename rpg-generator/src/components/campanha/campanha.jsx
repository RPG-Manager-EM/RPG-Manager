import React, { useEffect, useState } from 'react'

import { Typography, Paper, Box } from '@mui/material';

import PersonagemService from '../../service/personagem';

const Campanha = (props) => {
    const campanha = props.campanha;
    const [personagem, setPersonagem] = useState(null);

    useEffect(() => {
        PersonagemService.getByCampanhaAndUsuario(campanha.id, parseInt(localStorage.getItem('userId'))).then((e) => {
            setPersonagem(e);
        })
    }, [])

    const getNovaDataSessao = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }

    return (
        <Paper key={campanha.id} className='grid grid-cols-4 gap-6 items-center p-4 cursor-pointer transition duration-300 hover:opacity-95 hover:transition hover:duration-300 mb-4' sx={{ borderLeft: '10px solid', borderColor: 'secondary.main' }}>
            {
                campanha.mapa != null &&
                <Box className='flex items-center w-12 h-12'>
                    <img className="w-full h-full" src={"data:" + campanha.mapa.arquivo.tipo + ";base64," + campanha.mapa.arquivo.dados} alt="Campanha imagem" />
                </Box>
            }
            <Typography fontSize='22px' color='text.white'>{campanha.nome}</Typography>
            <Typography fontSize='22px' color='text.white'>{personagem?.nome}</Typography>
            <Typography fontSize='22px' color='text.white'>Prox. Sessão: {campanha.proxima_sessao ? getNovaDataSessao(campanha.proxima_sessao.slice(0, 10).replaceAll("-", "/")) : " A  definir"}</Typography>
        </Paper>
    )
}

export default Campanha