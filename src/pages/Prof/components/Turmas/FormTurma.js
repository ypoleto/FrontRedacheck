import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { fetchUser } from '../../../../utils/user';
import axios from 'axios';

function Turma(props) {

    const [loading, setLoading] = useState(false);
    const [colegios, setColegios] = useState([]);
    const [cidades, setCidades] = useState([]);

    const handleSubmit = e => {
        e.preventDefault()
        if (props.method === "POST") {
            setLoading(true);
            axios.post('/turmas', props.turma)
                .then(() => {
                    alert('Adicionado!');
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (props.method === "PUT") {
            setLoading(true)
        }
        props.setDialogNovaTurma(false)
    };

    const fetchColegios = ()=>{
        // const cidades = fetchUser().cidades;
        // console.log('cidades', cidades);
    }

    useEffect(() => {
        fetchColegios();
        if (props.method === "PUT") {
            setLoading(true)
            console.log('oi', props.turma);
            axios.get(`/turmas/${props.turma.id}`)
                .then((response) => {
                    var newObj = Object.assign(props.turma, response.data);
                    newObj.colegio = parseInt(newObj.colegio);
                    newObj.cidade = parseInt(newObj.cidade);
                    props.setTurma(newObj)
                }).catch((error) => {
                    console.log(error);
                })
                .finally(() =>
                    setLoading(false)
                );
        }
    }, [props.method])


    return (
        <div className="container">
            <div className="boxCadastroTurma">
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
                        onChange={(e) => {
                            props.setTurma({
                                ...props.turma,
                                nome: e.target.value
                            })
                        }}
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
                            onChange={(e) => {
                                props.setTurma({
                                    ...props.turma,
                                    colegio: e.target.value
                                })
                            }}
                        >
                            {colegios && colegios.map((opcao) => (
                                <MenuItem key={opcao.cod} value={opcao.cod}>
                                    {opcao.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: '55px' }}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Salvar
                        </Button>
                        <Button fullWidth onClick={() => { props.setDialogNovaTurma(false); props.setTurma({}) }} variant="contained" color="error">
                            Cancelar
                        </Button>
                    </div>
                </form>

            </div >
        </div >
    );
}

export default Turma;
