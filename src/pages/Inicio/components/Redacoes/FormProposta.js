import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../../../../css/Cadastros.css';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from 'react-router-dom';
import TitleBoxes from '../TitleBoxes';
import dayjs from 'dayjs';

function Proposta() {

    const [proposta, setProposta] = useState({
        titulo: '',
        genero: '',
        min: '',
        max: '',
        aplicacao: '',
        entrega: '',
        dificuldade: '',
    });

    const [generos, setGeneros] = useState([
        { id: 1, value: 'Argumentativo' },
        { id: 2, value: 'Descritivo' },
        { id: 3, value: 'Expositivo' },
        { id: 4, value: 'Injuntivo' },
        { id: 5, value: 'Narrativo' }
    ]);

    const handleChange = (e) => {
        setProposta({
            ...proposta,
            [e.target.name]: e.target.value,
        });
        console.log(proposta);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar a proposta para o backend ou realizar outras operações
        console.log('Proposta enviada:', proposta);
    };

    const formatDateValue = (value, name) => {
        var target = {
            name: name,
            value: dayjs(value).format('YYYY-MM-DD'),
        };
        console.log(target);
        handleChange({ target });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='boxList'>
                <TitleBoxes title="Nova proposta de redação" add={false} />
                <div className="boxCadastro" style={{ margin: '0px 48px' }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Título da proposta"
                            fullWidth
                            margin="normal"
                            name="titulo"
                            required
                            value={proposta.titulo}
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
                                    <MenuItem key={opcao.id} value={opcao.value}>
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
                            <DatePicker onChange={value => formatDateValue(value, "aplicacao")}
                                slotProps={{ textField: { fullWidth: true } }}
                                label="Data de aplicação"
                            />
                            <DatePicker onChange={value => formatDateValue(value, "entrega")}
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
                            <Button type="submit" variant="outlined" color="primary">
                                Cadastrar Proposta
                            </Button>
                            <Button type="submit" variant="outlined" color="error">
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
