import React, { useState, useEffect } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import Campanha from '../campanha/campanha'
import CampanhaService from '../../service/campanha'
import PersonagemService from '../../service/personagem';

const Campanhas = (props) => {
    const [campanhas, setCampanhas] = useState([]);
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [openDialogCampanha, setOpenDialogCampanha] = useState(false)

    const [listaPersonagens, setListaPersonagens] = useState([]);
    const [personagem, setPersonagem] = useState({});

    const [inputNome, setInputNome] = useState("");

    useEffect(() => {
        let params = {};
        params.usuarioId = parseInt(localStorage.getItem("userId"));

        PersonagemService.getByUsuarioAndCampanhaNull(parseInt(localStorage.getItem("userId"))).then((response) => {
            setListaPersonagens(response);
            if (response.length > 0) {
                setPersonagem(response[0]);
            }
        });

        buscarCampanhas();
    }, []);

    const buscarCampanhas = () => {
        let listaNova = [];
        PersonagemService.getByUsuario(parseInt(localStorage.getItem('userId'))).then((e) => {
            for (let i = 0; i < e.length; i++) {
                if (e[i].campanha != null) {
                    listaNova.push(e[i].campanha);
                }
            }
            setTimeout(() => {
                setCampanhas(listaNova);
            }, 10);
        })
    }

    const handleClickOpen = () => {
        setOpenDialogCampanha(true);
    };

    const handleClose = () => {
        setOpenDialogCampanha(false);
    };

    const entrarEmCampanha = () => {
        if (nome != "" && senha != "") {
            try {
                CampanhaService.getByNomeAndSenha(nome, senha).then((e) => {
                    CampanhaService.updatePersonagem(personagem.id, e.id).then(() => {
                        setOpenDialogCampanha(false);
                    })
                })
            } catch (error) {
                console.log("erro - " + error)
            }
        }
    }

    const eventoTeclado = (e) => {
        if (e.key == "Enter") {
            pesquisaTitulo();
        }
    }

    const pesquisaTitulo = () => {
        if (inputNome != "") {
            let listaNova = [];
            PersonagemService.getByUsuario(parseInt(localStorage.getItem('userId'))).then((e) => {
                for (let i = 0; i < e.length; i++) {
                    if (e[i].campanha != null && e[i].campanha?.nome?.includes(inputNome)) {
                        listaNova.push(e[i].campanha);
                    }
                }
                setTimeout(() => {
                    setCampanhas(listaNova);
                }, 10);
            })
        } else {
            buscarCampanhas();
        }
    }

    return (
        <Box className='mt-6'>
            <Box className='flex justify-between mb-6'>
                <Box onKeyDown={(e) => { eventoTeclado(e) }} onBlur={() => { pesquisaTitulo() }} onChange={(e) => { setInputNome(e.target.value) }} value={inputNome} className='px-2 py-1 w-1/3 border outline-none' component='input' placeholder="Buscar campanha" />
                <Button onClick={handleClickOpen} sx={{ fontWeight: '600' }} color='tertiary' variant="contained" disableElevation>Entrar em campanha</Button>
            </Box>

            {campanhas.map((campanha, index) => {
                return <Campanha key={index} campanha={campanha} />
            })}

            <Dialog open={openDialogCampanha} onClose={handleClose}>
                <Box bgcolor="white">
                    <DialogTitle color='secondary'>Entrar em Campanha</DialogTitle>
                    <DialogContent>
                        <Box>
                            <label>
                                Nome da Campanha
                                <Box value={nome} onChange={(e) => setNome(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                            </label>
                            <label>
                                Senha
                                <Box value={senha} onChange={(e) => setSenha(e.target.value)} component="input" type="password" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                            </label>

                            <FormControl fullWidth sx={{ marginTop: '15px' }}>
                                <InputLabel id="demo-simple-select-label">Personagem</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personagem}
                                    label="Personagem"
                                    onChange={(e) => { setPersonagem(e.target.value) }}
                                >
                                    {listaPersonagens.map((persona) => (
                                        <MenuItem key={persona.id} sx={{ color: 'white' }} value={persona}>{persona.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={() => { entrarEmCampanha(); handleClose(); }}>Entrar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    )
}

export default Campanhas