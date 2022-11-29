import React, { useState, useRef, useEffect } from 'react'

import { Box, Button, Divider, IconButton, Typography } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';

import Sidebar from '../../components/sidebar/sidebar'
import UploadArquivoCinza from "../../img/uploadArquivoCinza.png"

import PersonagemService from "../../service/personagem";

const CriarPersonagem = () => {
    const [aba, setAba] = useState("jogador");

    const [nome, setNome] = useState("");
    const [vida, setVida] = useState("");
    const [mana, setMana] = useState("");
    const [nivel, setNivel] = useState("");
    const [fileList, setFileList] = useState([]);
    const [mapAbleFileList, setMapAbleFileList] = useState([]);

    const inputFile = useRef(null);

    const savePersonagem = () => {
        console.log("nome: ", nome);
        console.log("vida: ", vida);
        console.log("mana: ", mana);
        console.log("nivel: ", nivel);
        console.log("fileList: ", fileList);
        const idUser = JSON.parse(localStorage.getItem("userId"));
        console.log("iduser: ", idUser)
        PersonagemService.post({ nome, vida, mana, nivel, usuario: { id: idUser } }, fileList).then((response) => {
            console.log(response);
        })
    }

    const clearData = () => {
        setNome("");
        setVida("");
        setMana("");
        setNivel("");
        setFileList([]);
        setMapAbleFileList([]);
        inputFile.current.value = "";
    }

    const onInputFileClick = () => {
        inputFile.current.click();
    }

    const onFilesSelect = () => {
        for (let file of inputFile.current.files) {
            setFileList([...fileList, file]);
        }
    }

    useEffect(() => {
        setMapAbleFileList(Array.from(fileList));
    }, [fileList]);

    const deleteFile = (desiredIndex) => {
        setMapAbleFileList(mapAbleFileList.filter((_, index) => index !== desiredIndex));
        setFileList(fileList.filter((_, index) => index !== desiredIndex));
    }

    return (
        <Sidebar aba={aba} setAba={setAba}>
            <Box p='2rem 3rem'>
                <Box className='flex gap-12'>
                    <Typography variant='h5' color='text.secondary'>Criar personagem</Typography>
                </Box>
                <Divider sx={{ borderWidth: '1px' }} />

                <Box className='flex w-full pt-4'>
                    <Box className='w-2/4'>
                        <label>
                            Nome
                            <Box value={nome} onChange={(e) => setNome(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                        </label>
                        <label>
                            Vida
                            <Box value={vida} onChange={(e) => setVida(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                        </label>
                        <label>
                            Mana
                            <Box value={mana} onChange={(e) => setMana(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                        </label>

                        <label>
                            Nível
                            <Box value={nivel} onChange={(e) => setNivel(e.target.value)} component="input" className='w-full h-12 border-2 border-l-4 border-gray-300 rounded p-2 outline-none' sx={{ borderLeftColor: "secondary.main" }} />
                        </label>
                    </Box>
                    <Box className='flex flex-col items-center justify-center items-center w-2/4'>
                        <Box className='w-3/4 flex justify-center'>
                            <input id='input-file' type="file" hidden onChange={onFilesSelect} ref={inputFile} />
                            {fileList.length > 0
                                ?
                                <table className='table-auto border-collapse border border-slate-500 mb-8'>
                                    <thead >
                                        <tr>
                                            <th className='border border-slate-600 px-4 py-2'>Nome</th>
                                            <th className='border border-slate-600 px-4 py-2'>Remover</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mapAbleFileList?.map((file, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='border border-slate-700 px-4 py-2 text-center'>{file.name}</td>
                                                    <td className='border border-slate-700 px-4 py-2 text-center'>
                                                        <IconButton onClick={() => deleteFile(index)}>
                                                            <DeleteIcon color='secondary' />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                :
                                null
                            }
                        </Box>
                        <Button variant='outlined' color='primary' onClick={() => { onInputFileClick() }}>Adicionar Arquivo</Button>
                    </Box>
                </Box>
                <Box className='w-full flex justify-end mt-10'>
                    <Button onClick={() => { savePersonagem(); clearData(); }} color="secondary" variant="contained" disableElevation>Criar</Button>
                </Box>
            </Box>
        </Sidebar>
    )
}

export default CriarPersonagem