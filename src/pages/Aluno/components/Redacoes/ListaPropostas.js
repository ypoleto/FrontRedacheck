import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { CircularProgress, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TitleBoxes from '../../../../components/TitleBoxes';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import { DateRangeIcon } from '@mui/x-date-pickers';
import { getUser } from '../../../../utils/user';

function ListaRedacoes() {

    const [propostas, setPropostas] = useState([]);
    const [loading, setLoading] = useState([]);
    let navigate = useNavigate();


    const newRedacao = (proposta) => {
        navigate({
            pathname: '/novaredacao',
            search: `?proposta=${proposta.id}`
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

    const fetchPropostas = async () => {
        setLoading(true)
        const user = getUser();
        const params = {
            user_id: user.user_id
        }
        axios.get(`http://localhost:8000/propostas`, {params})
            .then(response => {
                setPropostas(response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getPropostas = () => {
        if (propostas.length === 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma proposta cadastrada.</span>
                </div>
            )
        }
        return (
            <Grid container spacing={4} columns={4}>
                {propostas.map((proposta, index) => (
                    <Grid item xs={8} sm={4} md={4} lg={2} key={index}>
                        <div className='boxRedacaoAluno'>
                            <div className='infosBoxRedacaoAluno'>
                                <div style={{ fontSize: 16, fontWeight: 600, display: 'flex', gap: 10 }}>
                                    <div>{getDificuldade(proposta.dificuldade)}</div>
                                    <span>{proposta.genero.nome}</span>
                                </div>
                                <div style={{ fontSize: 12 }}>
                                    <span>{proposta.tema}</span>
                                </div>
                                <div style={{ fontSize: 12, color: 'grey', display: 'flex', gap: 5 }}>
                                    <DateRangeIcon style={{ fontSize: '14px' }} />
                                    {dayjs(proposta.data_aplicacao).format("DD/MM/YYYY (HH:mm)")} - {dayjs(proposta.data_entrega).format("DD/MM/YYYY (HH:mm)")}
                                </div>
                                <div style={{ fontSize: 12, color: 'grey', display: 'flex', gap: 5 }}>
                                    <span>Palavras: {proposta.min_palavras} a {proposta.max_palavras}  </span>
                                </div>
                            </div>
                            <div style={{ alignSelf: 'center' }}>
                                <Button fullWidth variant="outlined" onClick={() => newRedacao(proposta)} >
                                    Começar
                                </Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    useEffect(() => {
        fetchPropostas();
    }, [])

    return (
        <div className='flex w-full'>
            <div className='list !m-10 w-full '>
                <TitleBoxes title="Propostas de redação" />
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
