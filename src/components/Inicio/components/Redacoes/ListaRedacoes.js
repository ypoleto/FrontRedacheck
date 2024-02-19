import { useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function ListaRedacoes() {

    // const [redacoes, setRedacoes] = useState([{
    //     id: 1,
    //     titulo: 'Redação de teste1',
    //     aluno: { nome: 'Aluno 1', turma: '3A ens medio' },
    //     descricao: 'Descrição de teste1',
    // },
    // {
    //     id: 2,
    //     titulo: 'Redação de teste2',
    //     aluno: { nome: 'Aluno 2', turma: '3A ens medio' },
    //     descricao: 'Descrição de teste2',
    // },
    // {
    //     id: 3,
    //     titulo: 'Redação de teste3',
    //     aluno: { nome: 'Aluno 3', turma: '3A ens medio' },
    //     descricao: 'Descrição de teste3',
    // },
    // {
    //     id: 4,
    //     titulo: 'Redação de teste4',
    //     aluno: { nome: 'Aluno 4', turma: '3A ens medio' },
    //     descricao: 'Descrição de teste4',
    // }
    // ]);
    const [redacoes, setRedacoes] = useState([]);

    const getRedacoesPendentes = () => {
        if (redacoes.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px' }}>
                    <div>
                        <span>Nenhuma redação pendente de correção.</span>
                    </div>
                    <Button style={{marginTop: 15}} variant='contained'><Link to="/proposta">Nova proposta</Link></Button>
                </div>
            )
        }
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={4}>
                {redacoes.map((redacao, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <div className='boxRedacao'>
                            <div className='infosBoxRedacao'>
                                <div style={{ fontSize: 20 }}> {redacao.titulo}</div>
                                <div style={{ fontSize: 14 }}>{redacao.aluno.nome} | {redacao.aluno.turma}</div>
                            </div>
                            <div>
                                <Button variant="contained">
                                    <EditIcon fontSize='small' />
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
            <div>
                <div className='tituloBoxLista'>Redações Pendentes</div>
                <div className="boxLista">
                    {getRedacoesPendentes()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
