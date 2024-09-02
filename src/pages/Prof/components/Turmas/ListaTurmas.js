import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import { useNavigate } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import axios from 'axios';

function ListaTurmas() {

    let navigate = useNavigate();
    const [dialogNovaTurma, setDialogNovaTurma] = useState(false);
    const [turma, setTurma] = useState({});
    const [method, setMethod] = useState('POST');
    const [turmas, setTurmas] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleEdit = (t) => {
        setTurma(t);
        navigate({
            pathname: '/turmas',
            search: `?turma=${t.turma_id}`

        }, { state: t })

        // setDialogNovaTurma(true);
        // setMethod('PUT');
    }

    const fetchTurmas = () => {
        setLoading(true);
        const params = {
            professor_id: getUser().user_id
        }
        axios.get('http://localhost:8000/turmas', { params })
            .then(response => {
                setTurmas(response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getTurmas = () => {
        if (turmas.length === 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma turma cadastrada.</span>
                </div>
            )
        }
        return (
            <>
                {
                    turmas.map((turma) => (
                        <div key={turma.turma_id}>
                            <>
                                <div className='boxTurma'>
                                    <div>
                                        <div>
                                            {turma.turma_ativa == 1 ?
                                                (<AdjustIcon className='text-green-700' />) :
                                                (<AdjustIcon className='text-red-700' />)
                                            }
                                            <span className='uppercase font-bold p-1'>
                                                {turma.nome}
                                            </span>
                                            <span style={{ margin: '0px 5px' }}>
                                                -
                                            </span>
                                            <span style={{ fontSize: 14 }}>
                                                {turma.colegio}
                                            </span>
                                        </div>
                                        <div className='codigoTurma'>
                                            <span>
                                                Código da turma: {turma.turma_id}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        <Button fullWidth variant='outlined' onClick={() => handleEdit(turma)}>
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            </>
                        </div>
                    ))
                }
            </>
        )
    }

    const handleClose = () => {
        setDialogNovaTurma(false);
    }

    useEffect(() => {
        fetchTurmas();
    }, [])


    return (
        <>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="container">
                <div className='list'>
                    <TitleBoxes add={true} title="Minhas turmas" tooltip="Nova turma" func={() => {
                        navigate({
                            pathname: '/turmas',
                        })
                    }} />
                    <div className="boxList">
                        {getTurmas()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTurmas;
