import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from '../../../../utils/user';

function Turma(props) {

    const [loading, setLoading] = useState(false);
    const [user] = useState(getUser());
    const [turmaAtual, setTurmaAtual] = useState({});

    const handleSubmit = e => {
        e.preventDefault()
        if (props.method === "POST") {
            const params = turmaAtual;
            params.professor = user.user_id;
            params.turma_ativa = 1;
            setLoading(true);
            axios.post('http://localhost:8000/turmas/', params)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (props.method === "PUT") {
            setLoading(true)
            let params = turmaAtual
            delete params.turma_id;
            axios.put(`http://localhost:8000/turmas/${props.turma.turma_id}`, turmaAtual)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        props.setDialogNovaTurma(false)
    };

    const handleDeactivate = () => {
        console.log(turmaAtual);
        let turmaAtiva = turmaAtual;
        turmaAtiva.turma_ativa = 0;
        axios.put(`http://localhost:8000/turmas/${turmaAtiva.turma_id}`, turmaAtiva)
            .then(() => {
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (props.method === "PUT") {
            setLoading(true)
            axios.get(`http://localhost:8000/turmas/${props.turma.turma_id}`)
                .then((response) => {
                    var newObj = Object.assign(props.turma, response.data);
                    setTurmaAtual(newObj)
                }).catch((error) => {
                    console.log(error);
                })
                .finally(() =>
                    setLoading(false)
                );
        }
        else {
            setTurmaAtual({});
        }
    }, [])

    useEffect(() => {
        console.log('aaa', turmaAtual);
    }, [turmaAtual])


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
                        value={turmaAtual.nome}
                        onChange={(e) => {
                            setTurmaAtual({
                                ...turmaAtual,
                                nome: e.target.value
                            })
                        }}
                        required
                    />
                    <TextField
                        label="Colégio"
                        fullWidth
                        margin="normal"
                        name="colegio"
                        value={turmaAtual.colegio}
                        onChange={(e) => {
                            setTurmaAtual({
                                ...turmaAtual,
                                colegio: e.target.value
                            })
                        }}
                        required
                    />
                    {turmaAtual.turma_ativa == 1 && (
                        <Button onClick={() => handleDeactivate()} fullWidth type="submit" variant="outlined" color="warning">
                            Desativar turma
                        </Button>
                    )}
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
