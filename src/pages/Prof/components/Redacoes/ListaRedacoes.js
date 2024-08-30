import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import axios from 'axios';
import {getHoraFormatada} from '../../../../utils/formatters'

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([]);
    let navigate = useNavigate();


    const handleCorrecao = (redacao) => {
        navigate({
            pathname: '/novacorrecao',
            search: `?redacao_id=${redacao.id}`
        })
    }

    const getRedacoesPendentes = () => {
        if (redacoes.length === 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma redação pendente de correção.</span>
                </div>
            )
        }
        return (
            <Grid justifyContent="center" container spacing={{ xs: 2, md: 3 }} columns={1}>
                {redacoes.map((redacao, index) => (
                    <Grid item xs={8} sm={4} md={4} lg={2} key={index}>
                        <div className='boxRedacaoProf'>
                            <div className='infosBoxRedacaoProf'>
                                <span style={{ fontSize: 15, fontWeight: '700' }}> {redacao.proposta.tema} - {redacao.proposta.genero.nome}</span>
                                <span style={{ fontSize: 14, color: 'gray' }}>{redacao.aluno.nome} </span>
                                <span style={{ fontSize: 14 }}>Envio: {getHoraFormatada(redacao.data_envio)} </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }} className='mt-5'>
                                <Button fullWidth variant="outlined" onClick={() => handleCorrecao(redacao)} >
                                    <span style={{ paddingLeft: 5 }}>Corrigir</span>
                                </Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    const fetchRedacoes = async () => {
        await axios.get('http://localhost:8000/redacoes', { params: { user_id: getUser().user_id } })
            .then((response) => {
                setRedacoes(response.data)
            })
    }

    useEffect(() => {
        fetchRedacoes();
    }, [])


    return (
        <div className="container min-w-full">
            <div className='list'>
                <TitleBoxes title="Redações Pendentes de Correção" tooltip="Nova proposta" />
                <div className="boxList">
                    {getRedacoesPendentes()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
