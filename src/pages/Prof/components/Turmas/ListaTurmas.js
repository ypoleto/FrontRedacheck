import { useState } from 'react';
import '../../../../css/Inicio.css';
import Turma from './FormTurma';
import { Button, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TitleBoxes from '../../../../components/TitleBoxes';

function ListaTurmas() {

    const [dialogNovaTurma, setDialogNovaTurma] = useState(false);
    const [turma, setTurma] = useState({});
    const [method, setMethod] = useState('POST');
    const [turmas, setTurmas] = useState([]);

    const getTurmas = () => {
        if (turmas.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma turma cadastrada.</span>
                </div>
            )
        }
        return (
            <>
                {turmas.map((turma) => (
                    <>
                        <div className='boxTurma'>
                            <div className='editTurma'>
                                <Button variant='contained' onClick={() => { setTurma(turma); setDialogNovaTurma(true); setMethod('PUT'); }} style={{ backgroundColor: 'white', color: 'black', height: '50px', width: '100px', top: '25%' }}>
                                    Editar
                                </Button>
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}> {turma.nome}</div>
                                <div style={{ fontSize: 14 }}> {turma.colegio}</div>
                            </div>

                        </div>
                    </>
                ))}
            </>
        )
    }

    const handleClose = () => {
        setDialogNovaTurma(false);
    }

    return (
        <>
            <div className="container">
                <div className='list'>
                    <TitleBoxes add={true} title="Minhas turmas" tooltip="Nova turma" func={() => setDialogNovaTurma(true)} />
                    <div className="boxList">
                        {getTurmas()}
                    </div>
                </div>
            </div>
            <Dialog
                open={dialogNovaTurma}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            height: "100%",
                            maxWidth: "700px",
                            maxHeight: "400px",
                        },
                    },
                }}
            >
                <DialogTitle>
                    <TitleBoxes title={method === "POST" ? "Nova turma" : "Editar turma"} />
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <Turma turma={turma} setTurma={setTurma} turmas={turmas} method={method} setTurmas={setTurmas} setDialogNovaTurma={setDialogNovaTurma} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ListaTurmas;
