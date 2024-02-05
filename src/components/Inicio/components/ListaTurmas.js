import { useState } from 'react';
import '../../../css/Inicio.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function ListaTurmas() {

    const [turmas, setTurmas] = useState([
        { id: 1, nome: '1°A Ens Medio', colegio: 'Polo' },
        { id: 2, nome: '2°A Ens Medio', colegio: 'Polo' },
    ]);

    const getTurmas = () => {
        if (turmas.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px' }}>
                    <div>
                        <span>Nenhuma turma cadastrada.</span>
                    </div>
                    <Button style={{ marginTop: 15 }} variant='contained'>Adicionar turma</Button>
                </div>
            )
        }
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {turmas.map((turma, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <div className='boxTurma'>
                            <div style={{ fontSize: 16 }}> {turma.nome}</div>
                            <div style={{ fontSize: 14 }}> Colégio {turma.colegio}</div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <div className="container">
            <div>
                <div className='tituloBoxLista'>Minhas turmas</div>
                <div className="boxLista">
                    {getTurmas()}
                </div>
            </div>
        </div>
    );
}

export default ListaTurmas;
