import { useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TitleBoxes from '../../../../components/TitleBoxes';
import { Link } from 'react-router-dom';

function ListaRedacoes() {

    const [propostas, setPropostas] = useState([
        {
            id: 1,
            tema: 'POLÍTICAS PÚBLICAS E ACORDOS INTERNACIONAIS: O PAPEL DO MUNDO NO COMBATE ÀS MUDANÇAS CLIMÁTICAS',
            genero: 'Dissertativo Argumentativo',
            min: 100,
            max: 1000,

        },
        {
            id: 2,
            tema: 'CAMINHOS PARA VALORIZAR OS PROFISSIONAIS FORMADOS EM CURSOS TÉCNICOS',
            genero: 'Dissertativo Argumentativo',
            min: 100,
            max: 1000,

        }
    ]);

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
                                <Link to={`/novaredacao?proposta=${proposta.id}`}>
                                    <Button size='small' color='success' variant="contained" >
                                        <AddIcon fontSize='small' />
                                        <span style={{ paddingLeft: 5 }}>Começar</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

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
