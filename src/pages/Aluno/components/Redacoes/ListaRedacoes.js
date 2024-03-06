import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TitleBoxes from '../../../../components/TitleBoxes';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ListaRedacoes() {

    const [propostas, setPropostas] = useState([]);
    let navigate = useNavigate();


    const newRedacao = (proposta) => {
        console.log(proposta);
        navigate({
            pathname: '/novaredacao',
            search: `?proposta=${proposta._id}`
        })
    }

    const fetchPropostas = async () => {
        axios.get('/propostas', {})
            .then(response => {
                setPropostas(response.data)
            })
    }

    const getPropostas = () => {
        if (propostas.length == 0) {
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
                                <div style={{ fontSize: 16, fontWeight: 600 }}>
                                    <span>{proposta.genero}</span>
                                </div>
                                <div style={{ fontSize: 12 }}>
                                    <span>{proposta.tema}</span>
                                </div>
                                <div style={{ fontSize: 12, color: 'grey', display: 'flex', gap: 5 }}>
                                    <span>Palavras: {proposta.min} a {proposta.max}  </span>
                                </div>
                            </div>
                            <div style={{ alignSelf: 'center' }}>
                                <Button onClick={() => newRedacao(proposta)} size='small' color='success' variant="contained" >
                                    <AddIcon fontSize='small' />
                                    <span style={{ paddingLeft: 5 }}>Começar</span>
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
        <div className="container">
            <div className='list'>
                <TitleBoxes title="Propostas de redação" />
                <div className="boxList">
                    {getPropostas()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
