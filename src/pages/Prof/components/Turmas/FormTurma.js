import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Turma(props) {

    const [loading, setLoading] = useState(false);
    const [colegios, setColegios] = useState([]);

    const getColegios = () => {
        var params = {
            cidade: 4104303,
        }
        setLoading(true)
        axios.get('http://educacao.dadosabertosbr.org/api/escolas/buscaavancada', { params })
            .then((response) => {
                setColegios(response.data[1])
                localStorage.setItem("colegios", JSON.stringify(response.data[1]));
            }).catch((error) => {
                console.log(error);
            })
            .finally(() =>
                setLoading(false)
            );

    };

    const handleSubmit = e => {
        e.preventDefault()
        if (props.method === "POST") {
            props.setTurmas(turmas => [...turmas, props.turma])
        } else if (props.method === "PUT") {
            console.log(props.turmas.indexOf(element => element.id === props.turma.id));
        }
        props.setDialogNovaTurma(false)
    };

    useEffect(() => {
        if (localStorage.getItem("colegios")) {
            setColegios(JSON.parse(localStorage.getItem("colegios")))
        }
        else {
            getColegios();
        }
    }, [])

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
                        value={props.turma.nome}
                        onChange={(e) => props.setTurma({
                            ...props.turma,
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
                            value={props.turma.colegio}
                            onChange={(e) => props.setTurma({
                                ...props.turma,
                                colegio: e.target.value // But override this one
                            })}
                        >
                            {colegios && colegios.map((opcao) => (
                                <MenuItem key={opcao.cod} value={opcao.nome}>
                                    {opcao.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: '55px'}}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Salvar
                        </Button>
                        <Button fullWidth onClick={() => props.setDialogNovaTurma(false)} variant="contained" color="error">
                            Cancelar
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Turma;
