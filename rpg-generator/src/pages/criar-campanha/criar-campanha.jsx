import React, { useState, useEffect } from 'react'

import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import MapaService from '../../service/mapa.js';
import SistemaService from '../../service/sistema.js';
import CampanhaService from '../../service/campanha.js';

import Sidebar from '../../components/sidebar/sidebar'
import UploadArquivoCinza from "../../img/uploadArquivoCinza.png"

import adicionar from "../../../src/img/botao-adicionar.png";

const CriarCampanha = () => {
    const [aba, setAba] = useState("mestre");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mapa, setMapa] = useState("");
    const [senha, setSenha] = useState("");

    const [imagem, setImagem] = useState(UploadArquivoCinza);
    const [mapas, setMapas] = useState([]);
    const [mapasSalvos, setMapasSalvos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        MapaService.getByUser(parseInt(localStorage.getItem('userId'))).then((response) => {
            setMapas(response.data);
            if(response.data.length > 0) {
                setMapa(response.data[0].id);
            }
        })
    }, []);

    const criarCampanha = () => {
        const idUser = JSON.parse(localStorage.getItem("userId"));
        const logo = document.getElementById('input-file').files[0];

        CampanhaService.post({
            campanha:
                { nome, descricao, usuario: { id: idUser }, arquivada: false, senha: senha },
            logo,
            mapa
        }).then((response) => {
            setNome("");
            setDescricao("");
            setMapa("");
            setImagem(UploadArquivoCinza);
            navigate('/home');
        });
    }

    const adicionarMapa = () => {
        if(mapas.length > 0) {
            mapasSalvos.push(mapas[0]);
        }
    }

    return (
        <Sidebar aba={aba} setAba={setAba}>
            <Box p='2rem 3rem'>
                <Box className='flex gap-12'>
                    <Typography variant='h5' color='text.secondary'>Criar campanhas</Typography>
                </Box>
                <Divider sx={{ borderWidth: '1px' }} />

                {/* Container conteudo */}
                <Box className='w-full pt-4'>
                    <Box className='flex gap-20'>
                        {/* left part */}
                        <Box className='w-3/4'>
                            <label>
                                Campanha
                                <Box value={nome} onChange={(e) => setNome(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} placeholder='Nome da campanha' />
                            </label>
                            <label>
                                Descrição
                                <Box value={descricao} onChange={(e) => setDescricao(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} placeholder='Descrição da campanha' />
                            </label>
                            <label>
                                Senha
                                <Box value={senha} onChange={(e) => setSenha(e.target.value)} component="input" type='password' className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} placeholder='Senha da campanha' />
                            </label>
                            <label>
                                Mapa
                                <Box value={mapa} onChange={(e) => { setMapa(e.target.value) }} component="select" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} >
                                    {mapas.map((mapa, index) => {
                                        return <option key={index} value={mapa.id}>{mapa.nome}</option>
                                    })}
                                </Box>
                            </label>
                        </Box>

                        {/* right part */}
                        <Box className='w-1/4'>
                            <label>
                                Logo da campanha
                                <input id='input-file' type="file" hidden
                                    onChange={() => {
                                        setImagem(URL.createObjectURL(document.getElementById('input-file').files[0]));
                                    }} />
                                <Box className='flex justify-center items-center w-full h-72 border rounded'>
                                    <img src={imagem} className='w-10/12 h-11/12 ' />
                                </Box>
                            </label>
                        </Box>
                    </Box>
                    <Box className='flex justify-end mt-12'>
                        <Button onClick={criarCampanha} variant='contained' color='secondary' sx={{ color: "white" }} disableElevation>Criar campanha</Button>
                    </Box>
                </Box>
            </Box>
        </Sidebar>
    )
}

export default CriarCampanha