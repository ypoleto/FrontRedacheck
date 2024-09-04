import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../../../../css/Cadastros.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from 'react-router-dom';
import TitleBoxes from '../../../../components/TitleBoxes';
import dayjs from 'dayjs';
import axios from 'axios';
import { getUser } from '../../../../utils/user';
import { useNavigate } from 'react-router-dom';

function Proposta() {
    let navigate = useNavigate();

    const [proposta, setProposta] = useState({
        tema: '',
        genero_id: '',
        min_palavras: '',
        max_palavras: '',
        data_aplicacao: '',
        data_entrega: '',
        dificuldade: '',
        turma_id: '',
        user_id: getUser().user_id,
    });
    const [loading, setLoading] = useState(false);
    const [generos, setGeneros] = useState([]);
    const [turmas, setTurmas] = useState([]);

    const handleChange = (e) => {
        setProposta({
            ...proposta,
            [e.target.name]: e.target.value,
        });
    };

    const fetchGeneros = () => {
        setLoading(true);
        axios.get('http://localhost:8000/generos')
            .then(response => {
                setGeneros(response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchTurmas = () => {
        setLoading(true);
        axios.get('http://localhost:8000/turmas')
            .then(response => {
                let turmasfinal = response.data.filter(t => t.professor == getUser().user_id)
                console.log(turmasfinal);
                
                setTurmas(turmasfinal)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const turma_id = proposta.turma_id
        delete proposta.turma_id
        axios.post(`http://localhost:8000/propostas?turma_id=${turma_id}`, proposta)
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formatDateValue = (value, name) => {
        var target = {
            name: name,
            value: dayjs(value).format('YYYY-MM-DD'),
        };
        handleChange({ target });
    };

    useEffect(() => {
        fetchGeneros();
        fetchTurmas();
    }, [])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='boxList'>
                <TitleBoxes title="Nova proposta de redação" add={false} />
                <div className="boxCadastro" style={{ margin: '0px 48px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className='formPropostaDivs'>
                            <FormControl fullWidth>
                                <InputLabel id="label-select">Turma</InputLabel>
                                <Select
                                    required
                                    labelId="label-select"
                                    label="Turma"
                                    name='turma_id'
                                    onChange={handleChange}
                                >
                                    {turmas && turmas.map((opcao) => (
                                        <MenuItem key={opcao.turma_id} value={opcao.turma_id}>
                                            {opcao.nome} - {opcao.colegio}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Título da proposta"
                                fullWidth
                                margin="normal"
                                name="tema"
                                required
                                value={proposta.tema}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='formPropostaDivs'>
                            <FormControl fullWidth>
                                <InputLabel id="label-select">Gênero Textual</InputLabel>
                                <Select
                                    fullWidth
                                    required
                                    labelId="label-select"
                                    label="Gênero textual"
                                    name='genero_id'
                                    onChange={handleChange}
                                >
                                    {generos && generos.map((opcao) => (
                                        <MenuItem key={opcao.genero_id} value={opcao.genero_id}>
                                            {opcao.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Dificuldade</InputLabel>
                                <Select
                                    label="Dificuldade"
                                    name="dificuldade"
                                    value={proposta.dificuldade}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="facil">Fácil</MenuItem>
                                    <MenuItem value="medio">Médio</MenuItem>
                                    <MenuItem value="dificil">Difícil</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='minMaxDates'>
                            <div style={{ display: 'flex', gap: '16px' }} className='minmax'>
                                <TextField
                                    label="Mínimo de palavras"
                                    fullWidth
                                    type='number'
                                    margin="normal"
                                    name="min_palavras"
                                    value={proposta.texto}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Máximo de palavras"
                                    fullWidth
                                    type='number'
                                    margin="normal"
                                    name="max_palavras"
                                    value={proposta.texto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }} className='dates'>
                                <DateTimePicker onChange={value => formatDateValue(value, "data_aplicacao")}
                                    slotProps={{ textField: { fullWidth: true } }}
                                    label="Data de aplicação"
                                />
                                <DateTimePicker onChange={value => formatDateValue(value, "data_entrega")}
                                    slotProps={{ textField: { fullWidth: true } }}
                                    label="Data para entrega"
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 30 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Cadastrar Proposta
                            </Button>
                            <Button type="submit" variant="contained" color="error">
                                <Link to="/">
                                    Cancelar
                                </Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default Proposta;
