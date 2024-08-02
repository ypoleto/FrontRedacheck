import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import '../../../../css/Cadastros.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import TitleBoxes from '../../../../components/TitleBoxes';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
import { getUser } from '../../../../utils/user';

function Redacao() {

    const [numPalavras, setNumPalavras] = useState(0);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const [redacao, setRedacao] = useState({
        user_id: getUser().user_id,
    });
    const [proposta, setProposta] = useState({});
    const query = useLocation().search

    const checkPalavras = () => {
        return inputValue.trim().split(/\s+/).length >= proposta.max_palavras
    }

    const handleChangeRedacao = (e) => {
        const words = e.target.value.trim().split(/\s+/); // Quebra o texto em palavras
        if (words.length <= proposta.max_palavras) {
            setInputValue(e.target.value);
            setNumPalavras(words.length)
        }
        setRedacao({
            ...redacao,
            [e.target.name]: e.target.value,
        });
    };

    const handleChange = (e) => {
        setRedacao({
            ...redacao,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        setLoading(true);
        const agora = new Date().toISOString(); // Use ISO string for consistency

        const redacaoComData = {
            ...redacao,
            data_envio: agora,
        };

        console.log('redacaoComData', redacaoComData);

        e.preventDefault();
        axios.post(`http://localhost:8000/redacoes`, redacaoComData)
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

    const fetchProposta = (id) => {
        setRedacao({
            ...redacao,
            proposta_id: id,
        });
        axios.get(`http://localhost:8000/propostas/${id}`)
            .then(response => {
                setProposta(response.data)
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
                    <span style={{ display: 'flex', textAlign: 'start', marginBottom: 30 }}>{proposta.tema}</span>
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
                            name="texto"
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
                            <span style={{ color: checkPalavras() ? 'red' : 'grey' }}>Palavras: {numPalavras}/{proposta.max_palavras}</span>
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
