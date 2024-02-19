import { useState, useEffect } from 'react';
import '../../../../css/Inicio.css';
import Turma from '../Turmas/FormTurma';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from 'react-router-dom';

function ListaTurmas() {

    const [dialogNovaTurma, setDialogNovaTurma] = useState(false);
    const [turmas, setTurmas] = useState([]);

    const getTurmas = () => {
        if (turmas.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px' }}>
                    <div>
                        <span>Nenhuma turma cadastrada.</span>
                    </div>
                    <Button style={{ marginTop: 15 }} variant='contained' onClick={() => setDialogNovaTurma(true)}>Adicionar turma</Button>
                </div>
            )
        }
        return (
            <>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                    {turmas.map((turma, index) => (
                        <Grid item xs={8} sm={4} md={4} key={index}>
                            <div className='boxTurma'>
                                <div style={{ fontSize: 16, fontWeight: 'bold' }}> {turma.nome}</div>
                                <div style={{ fontSize: 14 }}> {turma.colegio}</div>
                            </div>
                        </Grid>
                    ))}
                    <Grid item xs={8} sm={4} md={4}>
                        <Button style={{ marginTop: 20 }} onClick={() => setDialogNovaTurma(true)}>
                            <AddOutlinedIcon fontSize='small' />
                            Adicionar nova turma
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }

    const handleClose = () => {
        console.log('ua');
        setDialogNovaTurma(false);
    }

    useEffect(() => {
      console.log('turmas', turmas);
    }, [turmas])
    

    return (
        <>
            <div className="container">
                <div>
                    <div className='tituloBoxLista'>Minhas turmas</div>
                    <div className="boxLista">
                        {getTurmas()}
                    </div>
                </div>
            </div>

            <Dialog
                open={dialogNovaTurma}
                onClose={handleClose}
            >
                <DialogTitle>Nova turma</DialogTitle>
                <DialogContent>
                    <Turma turmas={turmas} setTurmas={setTurmas} setDialogNovaTurma={setDialogNovaTurma} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ListaTurmas;
