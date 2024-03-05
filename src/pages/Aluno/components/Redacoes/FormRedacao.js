import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../../../../css/Cadastros.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useLocation } from 'react-router-dom';
import TitleBoxes from '../../../../components/TitleBoxes';
import dayjs from 'dayjs';
import WarningIcon from '@mui/icons-material/Warning';

function Redacao() {

    const [numPalavras, setNumPalavras] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const checkPalavras = () => {
        return inputValue.trim().split(/\s+/).length >= redacao.max
    }

    const [redacao, setRedacao] = useState({});

    const query = useLocation().search

    const [generos, setGeneros] = useState([
        { id: 1, value: 'Argumentativo' },
        { id: 2, value: 'Descritivo' },
        { id: 3, value: 'Expositivo' },
        { id: 4, value: 'Injuntivo' },
        { id: 5, value: 'Narrativo' }
    ]);

    const handleChangeRedacao = (e) => {
        const words = e.target.value.trim().split(/\s+/); // Quebra o texto em palavras
        if (words.length <= redacao.max) {
            setInputValue(e.target.value);
            setNumPalavras(words.length)
        }
    };

    const handleChange = (e) => {

        setRedacao({
            ...redacao,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var params = JSON.parse('{"' + query.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        var redacaoFinal = Object.assign(params, redacao)
        console.log('Redacao', redacaoFinal);
        
    };

    useEffect(() => {
        // var newObj = Object.assign({}, props.redacao)
        setRedacao({
            id: 1,
            tema: 'POLÍTICAS PÚBLICAS E ACORDOS INTERNACIONAIS: O PAPEL DO MUNDO NO COMBATE ÀS MUDANÇAS CLIMÁTICAS',
            genero: 'Dissertativo Argumentativo',
            min: 100,
            max: 3,
        });
    }, [])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='boxCadastro'>
                <TitleBoxes title="Nova redação" add={false} back={true} />
                <div style={{ padding: 20 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Título"
                            fullWidth
                            margin="normal"
                            size='small'
                            name="titulo"
                            required
                            value={redacao.titulo}
                            onChange={handleChange}
                            style={{ marginBottom: 20 }}
                        />

                        <TextField
                            label="Redação"
                            fullWidth
                            margin="normal"
                            multiline
                            id="outlined-multiline-static"
                            size='small'
                            name="titulo"
                            required
                            error={checkPalavras()}
                            value={inputValue}
                            onChange={handleChangeRedacao}

                            minRows={12}
                        />

                        <div style={{ display: 'flex', color: 'grey', fontSize: 10, gap: 5 }}>
                            {(checkPalavras()) &&
                                (
                                    <WarningIcon style={{ color: checkPalavras() ? 'red' : 'grey', fontSize: 12 }} />
                                )
                            }
                            <span style={{ color: checkPalavras() ? 'red' : 'grey' }}>Palavras: {numPalavras}/{redacao.max}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 20, marginTop: 30, justifyContent: 'center' }}>
                            <Button type='submit' color='success' variant='contained'>
                                Enviar redação
                            </Button>

                            <Link to="/">
                                <Button color='error' variant='contained'>
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default Redacao;
