import { useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TitleBoxes from '../../../../components/TitleBoxes';

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([
        {
            id: 1,
            titulo: 'Adoção de maiores de idade',
            genero: 'Argumentativo',
            aluno: {
                nome: "Maria",
                turma: "1º ano"
            }

        },
        {
            id: 1,
            titulo: 'Adoção de maiores de idade',
            genero: 'Argumentativo',
            aluno: {
                nome: "Joao",
                turma: "1º ano"
            }

        }
    ]);

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
                                <div style={{ fontSize: 18, fontWeight: 'bold' }}> {redacao.titulo}</div>
                                <div style={{ fontSize: 14, color: 'gray' }}>{redacao.aluno.nome} | {redacao.aluno.turma}</div>
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
