import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Backdrop, CircularProgress, Grid, Icon } from '@mui/material';
import Button from '@mui/material/Button';
import TitleBoxes from '../../../../components/TitleBoxes';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import { DateRangeIcon } from '@mui/x-date-pickers';
import { getUser } from '../../../../utils/user';
import { getHoraFormatada } from '../../../../utils/formatters';

function ListaRedacoes() {

    const [propostas, setPropostas] = useState([]);
    const [loading, setLoading] = useState([]);
    let navigate = useNavigate();


    const getPalavras = (texto) => {
        const words = texto.trim().split(/\s+/); // Quebra o texto em palavras
        return words.length
    }

    const getVisualizarCorrecao = (redacao_id) => {
        navigate({
            pathname: '/correcao',
            search: `?redacao_id=${redacao_id}`
        })
    }

    const getDificuldade = (id) => {
        const dificuldadeConfig = {
            'facil': { backgroundColor: '#59c948', texto: 'Fácil' },
            'medio': { backgroundColor: '#f2e07d', texto: 'Médio' },
            default: { backgroundColor: '#d83636', texto: 'Difícil' }
        };

        const { backgroundColor, texto } = dificuldadeConfig[id] || dificuldadeConfig.default;

        return (
            <span style={{ backgroundColor, padding: '3px 10px', borderRadius: 5, fontSize: 13, color: 'white' }}>
                {texto}
            </span>
        );
    }

    const fetchRedacoesFeitas = async () => {
        setLoading(true)
        const user = getUser();
        const params = {
            user_id: user.user_id
        }
        axios.get(`http://localhost:8000/redacoes`, { params })
            .then(response => {
                setPropostas(response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getCorrigido = (status) => {
        if (status == 1) {
            return (
                <div style={{ backgroundColor: '#62C948' }} className='rounded-t-md p-1 text-white'>
                    <span>Corrigido</span>
                </div>
            )
        } else {
            return (
                <div style={{ backgroundColor: '#FEC134' }} className='rounded-t-md p-1 text-white'>
                    <span>Pendente de correção</span>
                </div>
            )
        }
    }

    const getPropostas = () => {
        if (propostas.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma redação.</span>
                </div>
            )
        }
        return (
            <Grid container spacing={4} columns={4}>
                {propostas.map((redacao, index) => (
                    <Grid item xs={8} sm={4} md={4} lg={2} key={index}>
                        <div>
                            {getCorrigido(redacao.status)}
                        </div>
                        <div className='boxRedacaoAluno'>
                            <div className='infosBoxRedacaoAluno'>
                                <span className='text-lg'>{redacao.titulo}</span>
                                <span className='text-gray-600 text-base'>{redacao.proposta.tema} - {redacao.proposta.genero.nome}</span>
                                <div className='text-sm text-gray-600'>
                                    <DateRangeIcon style={{ fontSize: '15px', marginTop: '-3px' }} />
                                    <span>
                                        Entregue em {getHoraFormatada(redacao.data_envio)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {redacao.status == 1 && (
                                    <div>
                                        <Button variant='outlined' fullWidth onClick={() => getVisualizarCorrecao(redacao.id)}>Ver correção</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    useEffect(() => {
        fetchRedacoesFeitas();
    }, [])

    return (
        <div className="container">
            <div className='list'>
                <TitleBoxes title="Redações submetidas" />
                <div className="boxList">
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>
                    ) : (
                        getPropostas()
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
