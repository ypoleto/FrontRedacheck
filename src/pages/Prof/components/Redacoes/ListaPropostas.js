import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import axios from 'axios';

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([]);

    const getPropostasCriadas = () => {
        if (redacoes.length == 0) {
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
                            <div className='infosBoxRedacaoProf'>
                                <div style={{ fontSize: 15, fontWeight: '700' }}> {proposta.tema}</div>
                                <div style={{ fontSize: 15, fontWeight: '700' }}> {proposta.genero.nome}</div>
                                <div style={{ fontSize: 15, fontWeight: '700' }}> {proposta.dificuldade}</div>
                                <div style={{ fontSize: 15, fontWeight: '700' }}> {proposta.min_palavras} - {proposta.max_palavras} </div>
                                <div style={{ fontSize: 15, fontWeight: '700' }}> {proposta.data_aplicacao}- {proposta.data_entrega} </div>
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
        await axios.get(`http://localhost:8000/propostas`, {params})
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
                <TitleBoxes title="Propostas Criadas" tooltip="Nova proposta" />
                <div className="boxList">
                    {getPropostasCriadas()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
