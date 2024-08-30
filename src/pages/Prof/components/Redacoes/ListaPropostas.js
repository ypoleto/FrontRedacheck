import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import { getHoraFormatada } from '../../../../utils/formatters'
import axios from 'axios';

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([]);

    const nivel = {
        facil: "fácil",
        medio: "médio",
        dificil: "difícil"
    }

    const getPropostasCriadas = () => {
        if (redacoes.length === 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma redação pendente de correção.</span>
                </div>
            )
        }
        return (
            <Grid justifyContent="center" container spacing={{ xs: 2, md: 3 }} columns={1}>
                {redacoes.map((proposta, index) => (
                    <Grid item xs={8} sm={4} md={4} lg={2} key={index}>
                        <div className='boxRedacaoProf'>
                            <div className='infosBoxRedacaoProf text-gray-700'>
                                <span className='text-lg text-black'>{proposta.tema}</span>
                                <span className='text-sm '>Gênero {proposta.genero.nome} - Nível {nivel[proposta.dificuldade]}</span>
                                <span>Palavras: {proposta.min_palavras} (min) - {proposta.max_palavras} (máx) </span>
                                <span> {getHoraFormatada(proposta.data_aplicacao)}- {getHoraFormatada(proposta.data_entrega)} </span>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    const fetchPropostasCriadas = async () => {
        let params = {
            user_id: getUser().user_id
        }
        await axios.get(`http://localhost:8000/propostas`, { params })
            .then((response) => {
                setRedacoes(response.data)
            })
    }

    useEffect(() => {
        fetchPropostasCriadas();
    }, [])


    return (
        <div className="container">
            <div className='list'>
                <TitleBoxes title="Propostas Criadas" add={true} link="/novaproposta" tooltip="Nova proposta" />
                <div className="boxList">
                    {getPropostasCriadas()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
