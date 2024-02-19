import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Turma(props) {

    const [loading, setLoading] = useState(false);
    const [turma, setTurma] = useState({
        nome: '',
        colegio: null,
    });

    const [colegios, setColegios] = useState([]);

    const getEscolas = () => {
        var params = {
            cidade: 4104303,
        }
        setLoading(true)
        axios.get('http://educacao.dadosabertosbr.org/api/escolas/buscaavancada', { params })
            .then((response) => {
                setColegios(response.data[1])
            }).catch((error) => {
                console.log(error);
            })
            .finally(() =>
                setLoading(false)
            );

    };

    const handleSubmit = e => {
        e.preventDefault()
        props.setTurmas(turmas => [...turmas, turma])
        props.setDialogNovaTurma(false)
    };

    useEffect(() => {
        if (getEscolas.length === 0) {
            getEscolas();
        }
    }, [])

    useEffect(() => {
        console.log('props.turmas', props.turmas);
    }, [props.turmas])

    return (
        <div className="container">
            <div className="boxCadastro">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome da turma"
                        fullWidth
                        margin="normal"
                        name="titulo"
                        onChange={(e) => setTurma({
                            ...turma,
                            nome: e.target.value // But override this one
                        })}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="label-select">Colégio</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="label-select"
                            label="Colégio"
                            onChange={(e) => setTurma({
                                ...turma,
                                colegio: e.target.value // But override this one
                            })}
                        >
                            {colegios.map((opcao) => (
                                <MenuItem key={opcao.cod} value={opcao.nome}>
                                    {opcao.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 30 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Cadastrar Turma
                        </Button>
                        <Button onClick={() => props.setDialogNovaTurma(false)} variant="contained" color="error">
                            Cancelar
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Turma;
