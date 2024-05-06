import { Button, Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import '../../css/Login.css';
import { useEffect, useState } from 'react';
import { isAuthenticated, loginUser } from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { isValidEmail } from '../../utils/validators'
function LoginPage() {

    const [login, setLogin] = useState({})
    const [users, setUsers] = useState()
    const [turmas, setTurmas] = useState()
    const [errorUser, setErrorUser] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [estados, setEstados] = useState([])
    const [cidades, setCidades] = useState([false])
    const [errorTurma, setErrorTurma] = useState(false)
    const [cidadesSelecionadas, setCidadesSelecionadas] = useState([])
    const [method, setMethod] = useState('login')
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === 'turmas') {
            setLogin({
                ...login,
                [e.target.name]: [e.target.value],
            });
        }
        if (e.target.name === 'email') {
            if (!isValidEmail(e.target.value)) {
                setErrorEmail(true)
            }
            else {
                setErrorEmail(false)
            }
        }
    };

    const handleChangeUser = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
        if (users.find(user => user.username === e.target.value)) {
            setErrorUser(true)
        }else{
            setErrorUser(false)
        }
    }
    const handleChangeTurma = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
        if (!turmas.find(turma => turma._id === e.target.value)) {
            setErrorTurma(true)
        }
        else {
            setErrorTurma(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (errorEmail || errorTurma || errorUser) {
            console.log("Verifique todos os campos.");
            return; 
        }
    
        // Restante do código para enviar os dados para a API
        var aux = login;
        delete aux.estado;
        aux.cidades = cidadesSelecionadas.toString();
        if (aux.tipo === 'professor') {
            aux.turmas = "";
        }
        console.log(aux);
        try {
            api.post('/users', aux)
                .then(() => {
                    navigate('/login');
                });
        } catch (err) {
            console.log('Erro:', err);
        }
    };

    const getAllUsers = () => {
        api.get('/users')
            .then(response => {
                setUsers(response.data)
            })
    };
    const getAllTurmas = () => {
        api.get('/turmas')
            .then(response => {
                setTurmas(response.data)
            })
    };
    const getEstados = () => {
        api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setEstados(response.data)
            })

    };
    const getCidades = (id) => {
        api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
            .then(response => {
                setCidades(response.data)
            })
    };


    useEffect(() => {
        getAllUsers()
        getAllTurmas()
        getEstados()
    }, [])

    return (
        <div className="loginPage">
            <div className='cardLogin'>
                <div className='cardRightLogin' style={{ padding: 20 }}>
                    <h1 style={{ color: '#444' }}>Novo usuário</h1>
                    <div className='loginInputs'>
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <TextField
                                    required
                                    label="Nome"
                                    fullWidth
                                    margin="normal"
                                    name="nome"
                                    value={login.nome}
                                    onChange={handleChange}

                                />
                                <TextField
                                    required
                                    label="Usuario"
                                    fullWidth
                                    margin="normal"
                                    name="username"
                                    value={login.username}
                                    onChange={handleChangeUser}
                                    error={errorUser}
                                    helperText={errorUser ? 'Usuário já cadastrado!' : ''}
                                />
                                <TextField
                                    required
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    value={login.email}
                                    error={errorEmail}
                                    onChange={handleChange}
                                    helperText={errorEmail ? " Digite um email válido" : ""}
                                />
                                <TextField
                                    required
                                    label="Senha"
                                    type='password'
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    value={login.password}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="label-select">Perfil</InputLabel>
                                    <Select
                                        required
                                        labelId="label-select"
                                        label="Perfil"
                                        name='tipo'
                                        onChange={handleChange}
                                    >
                                        <MenuItem key={'aluno'} value={'aluno'}>
                                            Aluno
                                        </MenuItem>
                                        <MenuItem key={'professor'} value={'professor'}>
                                            Professor
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                {login.tipo === 'aluno' && (
                                    <TextField
                                        required
                                        label="Código da turma"
                                        fullWidth
                                        margin="normal"
                                        name="turma"
                                        value={login.turmas}
                                        onChange={handleChangeTurma}
                                        error={errorTurma}
                                        helperText={errorTurma ? 'Turma não encontrada' : ''}
                                    />
                                )}
                            </div>
                            <FormControl fullWidth>
                                <InputLabel id="label-select">Estado</InputLabel>
                                <Select
                                    required
                                    labelId="label-select"
                                    label="Estado"
                                    name='estado'
                                    onChange={e => { handleChange(e); getCidades(e.target.value) }}
                                >
                                    {estados && estados.map((opcao) => (
                                        <MenuItem key={opcao.id} value={opcao.id}>
                                            {opcao.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                {login.tipo === 'professor' && (
                                    <>
                                        <InputLabel id="label-select">Cidades</InputLabel>
                                        <Select
                                            required
                                            disabled={!login.estado && cidades.length > 0}
                                            id="demo-multiple-checkbox"
                                            labelId="demo-multiple-checkbox-label"
                                            input={<OutlinedInput label="Tag" />}
                                            multiple
                                            onChange={e => setCidadesSelecionadas(e.target.value)}
                                            value={cidadesSelecionadas}
                                            renderValue={(selected) => {
                                                return selected
                                                    .map(id => {
                                                        const cidade = cidades.find(cidade => cidade.id === id);
                                                        return cidade ? cidade.nome : '';
                                                    })
                                                    .filter(nome => nome !== '')
                                                    .join(', ');
                                            }}
                                        >
                                            {cidades && cidades.map((opcao) => (
                                                <MenuItem key={opcao.id} value={opcao.id}>
                                                    <Checkbox checked={cidadesSelecionadas.indexOf(opcao.id) > -1} />
                                                    <ListItemText primary={opcao.nome} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </>
                                )}
                                {login.tipo === 'aluno' && (
                                    <>
                                        <InputLabel id="label-select">Cidade</InputLabel>
                                        <Select
                                            required
                                            disabled={!login.estado && cidades.length > 0}
                                            id="demo-multiple-checkbox"
                                            labelId="demo-multiple-checkbox-label"
                                            input={<OutlinedInput label="Tag" />}
                                            onChange={e => setCidadesSelecionadas([e.target.value])}
                                            value={cidadesSelecionadas}
                                        >
                                            {cidades && cidades.map((opcao) => (
                                                <MenuItem key={opcao.id} value={opcao.id}>
                                                    <ListItemText primary={opcao.nome} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </>
                                )}
                            </FormControl>
                            <Button type='submit' fullWidth size='large' variant='contained'>
                                Cadastrar
                            </Button>
                        </form>
                    </div>
                    <div style={{ width: '80%', fontSize: 14 }}>
                        <Divider>ou</Divider>
                    </div>
                    <span style={{ fontSize: 14 }}>
                        Já tem uma conta?
                        <Button onClick={() => navigate('/login')} size='small' style={{ textTransform: 'none' }}>Faça login</Button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
