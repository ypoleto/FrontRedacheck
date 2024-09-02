import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from '../../../../utils/user';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TitleBoxes from '../../../../components/TitleBoxes';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Turma(props) {

    let navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState();
    const [alunoBusca, setAlunoBusca] = useState();
    const [busca, setBusca] = useState();
    const [loading, setLoading] = useState(false);
    const [dialogAluno, setDialogAluno] = useState(false);
    const [user] = useState(getUser());
    const [turmaAtual, setTurmaAtual] = useState({});
    const [alunos, setAlunos] = useState([]);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const handleSubmit = e => {
        console.log(turmaAtual);

        if (!turmaAtual.turma_id) {
            const params = turmaAtual;
            params.professor = user.user_id;
            params.turma_ativa = 1;
            setLoading(true);
            axios.post('http://localhost:8000/turmas/', params)
                .then(() => {
                    navigate("/")
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(true)
            axios.put(`http://localhost:8000/turmas/${turmaAtual.turma_id}`, turmaAtual)
                .then(() => {
                    navigate('/')
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleAddAluno = () => {
        setBusca()
        setAlunoBusca()
        setDialogAluno(true)
    }

    const addAluno = () => {
        const body = {
            turma_id: turmaAtual.turma_id,
            user_id: alunoBusca.user_id
        }

        axios.post(`http://localhost:8000/turmas_users`, body)
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

    const handleDeleteAluno = (thu) => {
        setLoading(true);
        axios.delete(`http://localhost:8000/turmas_users/${thu.turmas_has_users_id}`)
            .then(response => {
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleBusca = () => {
        const username = busca.target.value

        setLoading(true);
        axios.get(`http://localhost:8000/user/${username}`)
            .then(response => {
                setAlunoBusca(response.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleTurma = () => {
        let turmaAtiva = turmaAtual;
        turmaAtiva.turma_ativa = !parseInt(turmaAtiva.turma_ativa);
        axios.put(`http://localhost:8000/turmas/${turmaAtiva.turma_id}`, turmaAtiva)
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchAlunosTurma = (id) => {
        setLoading(true);
        axios.get(`http://localhost:8000/turmas_users`, { params: { turma_id: id } })
            .then(response => {
                setAlunos(response.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getAlunosTurma = () => {
        return (
            <>
                <div>
                    <h1 className='text-start font-semibold text-xl p-1 my-5'>Alunos</h1>
                </div>
                <div className='grid grid-flow-col lg:grid-cols-3 md:grid-flow-row sm:grid-flow-row p-3 gap-3 border'
                    style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}
                >
                    {alunos.map(aluno => {
                        return (
                            <>
                                <div className='rounded-md p-4 border flex justify-between col-span-1'>
                                    <div>
                                        <span className='text-lg font-semibold'>{aluno.user.nome}</span>
                                        <br />
                                        <span className='text-gray-600'>@{aluno.user.nome}</span>
                                    </div>
                                    <div className='self-center'>
                                        <button onClick={() => { setOpenConfirm(true) }}>
                                            <CancelIcon className='text-red-500' />
                                        </button>
                                    </div>
                                </div>
                                <Dialog
                                    open={openConfirm}
                                >
                                    <DialogContent>
                                        <h1 className='text-2xl'>Deseja mesmo remover esse aluno?</h1>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenConfirm(false)}>Não</Button>
                                        <Button onClick={() => handleDeleteAluno(aluno)} autoFocus>
                                            Sim
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )
                    })}
                    <div className='rounded-md p-4 border flex justify-between col-span-1 hover:cursor-pointer hover:bg-green-100' onClick={() => { handleAddAluno() }}>
                        <div className='self-center'>
                            <span className=' text-lg'>Adicionar aluno</span>

                        </div>
                        <div className='self-center'>
                            <button >
                                <AddCircleIcon className='text-green-700' />
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    useEffect(() => {
        console.log('location.state', location.state);

        if (location.state) {
            setTurmaAtual(location.state)
            fetchAlunosTurma(location.state.turma_id)
        }
        else {
            setTurmaAtual({})
        }

    }, [location, searchParams]);




    return (
        <div className="container m-auto">
            <div className='-mx-5'>
                <TitleBoxes title={turmaAtual.turma_ativa == 1 ? 'Editar turma (ativa)' : 'Editar turma (inativa)'} />
            </div>
            <div className="boxCadastroTurma ">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className='flex justify-start mb-5 -mx-3'>
                    <FormControlLabel
                        control={
                            <Switch
                                size='medium'
                                checked={parseInt(turmaAtual.turma_ativa)}
                                onChange={handleTurma}
                            />
                        }

                        labelPlacement='start'
                        label={turmaAtual.turma_ativa == 1 ? 'Desativar' : 'Ativar'}
                    />
                </div>
                <form>
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
                    {turmaAtual.turma_id && (
                        <div>
                            {getAlunosTurma()}
                        </div>
                    )}


                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: '55px' }}>
                        <Button fullWidth onClick={() => handleSubmit()} variant="contained" color="primary">
                            Salvar
                        </Button>
                        <Button fullWidth onClick={() => { navigate('/') }} variant="contained" color="error">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div >
            <Dialog
                open={dialogAluno}
                onClose={() => setDialogAluno(false)}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            height: "100%",
                            maxWidth: "700px",
                            maxHeight: "400px",
                        },
                    },
                }}
            >
                <DialogContent>
                    <div>
                        <h1 className='text-lg font-semibold mb-3'>Adicionar aluno</h1>
                        <div className='flex'>
                            <TextField
                                required
                                label="Username"
                                fullWidth
                                margin="normal"
                                name="username"
                                onChange={setBusca}
                            />
                            <Button onClick={handleBusca}>Buscar</Button>
                        </div>
                        {alunoBusca ? (
                            <div className='my-5 gap-5 flex flex-col'>
                                <span>
                                    <b>Nome:</b> {alunoBusca.nome}
                                </span>
                                <span>
                                    <b>Username:</b> {alunoBusca.username}
                                </span>
                            </div>
                        ) : (
                            <div className='mt-5 h-full'>
                                <span className='text-gray-600'>Nenhum aluno encontrado</span>
                            </div>
                        )}
                        <div className='flex gap-5 absolute bottom-5 w-11/12 justify-center'>
                            {alunoBusca && (
                                <Button fullWidth onClick={() => addAluno()} variant="contained" color="primary">
                                    Adicionar
                                </Button>
                            )}
                            <Button fullWidth onClick={() => setDialogAluno(false)} variant="contained" color="error">
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Turma;
