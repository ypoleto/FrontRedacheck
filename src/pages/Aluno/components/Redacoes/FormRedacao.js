import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import '../../../../css/Cadastros.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import TitleBoxes from '../../../../components/TitleBoxes';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

function Redacao() {

    const [numPalavras, setNumPalavras] = useState(0);
    const [inputValue, setInputValue] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const [redacao, setRedacao] = useState({});
    const query = useLocation().search

    const checkPalavras = () => {
        return inputValue.trim().split(/\s+/).length >= redacao.max
    }

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

    };

    const fetchProposta = (id) => {
        axios.get('/propostas/', { params: { id: id } })
            .then(response => {
                setRedacao(response.data[0])
            });
    }

    useEffect(() => {
        fetchProposta(searchParams.get('proposta'));
    }, [])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='boxCadastro'>
                <TitleBoxes title="Nova redação" add={false} back={true} />
                <div style={{ padding: 20 }}>
                    <span style={{ display: 'flex', textAlign: 'start', marginBottom: 30 }}>{redacao.tema}</span>
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
