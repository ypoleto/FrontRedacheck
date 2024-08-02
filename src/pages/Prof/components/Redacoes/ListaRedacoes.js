import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import axios from 'axios';

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([]);

    const getRedacoesPendentes = () => {
        if (redacoes.length == 0) {
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
                                <span style={{ fontSize: 14 }}>Envio: {redacao.data_envio} </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button variant="contained" >
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
        <div className="container">
            <div className='list'>
                <TitleBoxes title="Redações Pendentes" tooltip="Nova proposta" />
                <div className="boxList">
                    {getRedacoesPendentes()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
