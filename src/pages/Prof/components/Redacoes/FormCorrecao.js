import axios from 'axios';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Link, useSearchParams } from 'react-router-dom';
import TitleBoxes from '../../../../components/TitleBoxes';

function FormCorrecao() {

    let [searchParams, setSearchParams] = useSearchParams();
    const [redacao, setRedacao] = useState()
    const [correcao, setCorrecao] = useState({ nota: 0 })

    const getRedacao = () => {
        if (redacao) {
            return (
                <>
                    <div className='boxCorrecao' style={{ alignItems: "start" }}>
                        <h1>{redacao.titulo}</h1>
                        <span>{redacao.texto}</span>
                        <span>{redacao.proposta.genero.nome}</span>
                        <span>{redacao.proposta.tema}</span>

                    </div>
                </>

            )
        }
        return (
            <>
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma redação correspondente.</span>
                </div>
            </>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/correcoes`, correcao)
            .then(() => {
                alert('Adicionado!');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nota') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                setCorrecao((prevCorrecao) => ({
                    ...prevCorrecao,
                    [name]: parseInt(value),
                }));
            }
        } else {
            setCorrecao((prevCorrecao) => ({
                ...prevCorrecao,
                [name]: value,
            }));
        }
        console.log('correcao', correcao);
    };

    const getForm = () => {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='boxCorrecao'>
                    <div style={{ padding: 20 }}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Comentários"
                                fullWidth
                                margin="normal"
                                size='small'
                                name="comentarios"
                                required
                                value={correcao.comentarios}
                                onChange={handleChange}
                                style={{ marginBottom: 20 }}
                                multiline
                                rows={4}
                            />
                            <TextField
                                label="Nota"
                                fullWidth
                                margin="normal"
                                size='small'
                                name="nota"
                                required
                                value={correcao.nota}
                                onInput={handleChange}
                                style={{ marginBottom: 20 }}
                            />


                            <div style={{ display: 'flex', gap: 20, marginTop: 30, justifyContent: 'center' }}>
                                <Button type='submit' color='success' variant='contained'>
                                    Enviar correção
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
        )
    }

    const fetchRedacao = (id) => {
        try {
            axios.get(`http://localhost:8000/redacoes/${id}`)
                .then(response => {
                    setRedacao(response.data)
                    setCorrecao({
                        ...correcao,
                        redacao_id: response.data.id,
                    });
                });
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        fetchRedacao(searchParams.get('redacao_id'));
    }, [])


    return (
        <>
            <div style={{ marginBottom: 10 }}>
                {getRedacao()}
            </div>
            <div>
                {getForm()}

            </div>
        </>
    );
}

export default FormCorrecao;
