import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../../css/Proposta.css';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Proposta() {

    const [proposta, setProposta] = useState({
        titulo: '',
        texto: '',
        dificuldade: '',
    });

    const handleChange = (e) => {
        setProposta({
            ...proposta,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar a proposta para o backend ou realizar outras operações
        console.log('Proposta enviada:', proposta);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="container">
                <div>
                    <div className='tituloBoxProposta'>Nova proposta de redação</div>
                    <div className="boxProposta">
                        <div>
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
                                <TextField
                                    label="Gênero da Proposta"
                                    fullWidth
                                    margin="normal"
                                    name="texto"
                                    value={proposta.texto}
                                    onChange={handleChange}
                                />
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <TextField
                                        label="Mínimo de palavras"
                                        fullWidth
                                        margin="normal"
                                        name="texto"
                                        value={proposta.texto}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label="Máximo de palavras"
                                        fullWidth
                                        margin="normal"
                                        name="texto"
                                        value={proposta.texto}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <DatePicker label="Data de aplicação" />
                                    <DatePicker
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
                                <Button type="submit" variant="contained" color="primary">
                                    Cadastrar Proposta
                                </Button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default Proposta;
