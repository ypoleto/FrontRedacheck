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

function Proposta() {

    const [proposta, setProposta] = useState({
        tema: '',
        genero: '',
        min: '',
        max: '',
        aplicacao: '',
        entrega: '',
        dificuldade: '',
    });
    const [loading, setLoading] = useState(false);
    const [generos, setGeneros] = useState([]);

    const handleChange = (e) => {
        setProposta({
            ...proposta,
            [e.target.name]: e.target.value,
        });
    };

    const fetchGeneros = () => {
        setLoading(true);
        axios.get('/generos')
            .then(response => {
                setGeneros(response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('/propostas', proposta)
            .then(() => {
                alert('Adicionado!');
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
                        <TextField
                            label="Título da proposta"
                            fullWidth
                            margin="normal"
                            name="tema"
                            required
                            value={proposta.tema}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-select">Gênero Textual</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="label-select"
                                label="Gênero textual"
                                name='genero'
                                onChange={handleChange}
                            >
                                {generos && generos.map((opcao) => (
                                    <MenuItem key={opcao._id} value={opcao.value}>
                                        {opcao.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div style={{ display: 'flex', gap: '16px', marginTop: 10 }}>
                            <TextField
                                label="Mínimo de palavras"
                                fullWidth
                                type='number'
                                margin="normal"
                                name="min"
                                value={proposta.texto}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Máximo de palavras"
                                fullWidth
                                type='number'
                                margin="normal"
                                name="max"
                                value={proposta.texto}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: 10 }}>
                            <DateTimePicker onChange={value => formatDateValue(value, "aplicacao")}
                                slotProps={{ textField: { fullWidth: true } }}
                                label="Data de aplicação"
                            />
                            <DateTimePicker onChange={value => formatDateValue(value, "entrega")}
                                slotProps={{ textField: { fullWidth: true } }}
                                label="Data para entrega"
                            />
                        </div>
                        <FormControl fullWidth margin="normal">
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
