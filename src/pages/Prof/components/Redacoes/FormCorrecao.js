import axios from 'axios';
import { Button, TextField, Dialog, DialogContent, DialogActions, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TipTapVisualizer from '../../../../utils/TipTap/TipTapVisualizer';
import CancelIcon from '@mui/icons-material/Cancel';
import TitleBoxes from '../../../../components/TitleBoxes'

function FormCorrecao() {
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [redacao, setRedacao] = useState();
    const [openDialog, setOpenDialog] = useState({ status: false, comment: {} });
    const [correcao, setCorrecao] = useState({ nota: 0 });
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [highlightedId, setHighlightedId] = useState(null);

    const getRedacao = () => {
        if (redacao) {
            return (
                <div className='mt-5'>
                    <div className='shadow-md border w-full col-span-2 overflow-auto'>
                        <div className='flex text-left flex-col p-4'>
                            <h2 className='font-semibold text-lg mb-3'>{redacao.titulo}</h2>
                            <TipTapVisualizer
                                content={redacao.texto}
                                highlightedId={highlightedId}
                                setHighlightedId={setHighlightedId}
                                handleCommentClick={handleCommentClick}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                <span>Nenhuma redação correspondente.</span>
            </div>
        );
    };

    const handleSubmit = (e) => {
        console.log('correcao', correcao);
        axios.post(`http://localhost:8000/correcoes`, correcao)
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nota') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                setCorrecao((prevCorrecao) => ({
                    ...prevCorrecao,
                    [name]: parseInt(value) || 0,
                }));
            }
        } else {
            setCorrecao((prevCorrecao) => ({
                ...prevCorrecao,
                [name]: value,
            }));
        }
    };

    const handleCommentHover = (paragrafo_id) => {
        setHighlightedId(paragrafo_id);
    };

    const handleCommentLeave = () => {
        setHighlightedId(null);
    };

    const handleDeleteComentario = (id) => {
        alert('Are you sure you want to delete' + id)
    }
    const handleCommentClick = (comment) => {
        console.log(comment);
        setOpenDialog({ status: true, comment: { paragrafo_id: comment.target.dataset.id, comentario: comment.target.innerText } });
    }
    const handleClose = () => {
        setOpenDialog({ status: false, comment: {} });
    }

    const handleSubmitComentario = () => {
        setComentarios([...comentarios, {
            paragrafo_id: openDialog.comment.paragrafo_id,
            comentario: comentario
        }]);
        
        setOpenDialog({ status: false })
    }

    const getComentarioBox = (comment) => {
        return (
            <div>
                <div
                    key={comment.comentario_id}
                    className='border rounded-md p-2 my-2 text-sm flex justify-between'
                    onMouseEnter={() => handleCommentHover(comment.paragrafo_id)}
                    onMouseLeave={handleCommentLeave}
                >
                    <div>
                        <span className='text-gray-700'>{comment.comentario}</span>
                    </div>
                    <div className='content-center'>
                        <button className='w-6 h-6' onClick={() => handleDeleteComentario(comment.comentario_id)}>
                            <CancelIcon className='text-red-500' />
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const getComentarios = () => {
        return (
            <div className='mt-5 text-start'>
                {comentarios.map(comment =>
                    getComentarioBox(comment)
                )}

            </div>
        );
    };

    const fetchRedacao = (id) => {
        try {
            axios.get(`http://localhost:8000/redacoes/${id}`)
                .then(response => {
                    setRedacao(response.data);
                    setCorrecao({
                        ...correcao,
                        redacao_id: response.data.id,
                    });
                });
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        fetchRedacao(searchParams.get('redacao_id'));
    }, []);

    useEffect(() => {
        console.log('openDialog', openDialog);
    }, [openDialog]);

    useEffect(() => {
        setCorrecao((prevCorrecao) => ({
            ...prevCorrecao,
            comentarios: comentarios,
        }));
    }, [comentarios])
    


    return (
        <>
            <div>
                <TitleBoxes title='Nova correção' />

            </div>
            <div className='grid grid-flow-col grid-cols-3'>
                <div className='col-span-2 px-5'>
                    {getRedacao()}
                </div>
                <div className='col-span-1 px-5'>
                    <Divider>Comentários</Divider>
                    <div className='mb-10'>
                        {getComentarios()}
                    </div>
                    <Divider>Nota</Divider>
                    <div className='mt-2'>
                        <TextField
                            fullWidth
                            margin="normal"
                            size='small'
                            name="nota"
                            required
                            value={correcao.nota}
                            onInput={handleChange}
                            style={{ marginBottom: 20 }}
                        />
                    </div>
                    <div className='mt-5'>
                        <Button
                            
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit()}
                        >
                            Enviar
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog
                open={openDialog.status}
                onClose={handleClose}
            >
                <DialogContent
                    className='w-80'
                >
                    <TextField
                        autoFocus
                        required
                        name="comentario"
                        label="Comentário"
                        fullWidth
                        variant="standard"
                        onChange={e => setComentario(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmitComentario}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FormCorrecao;
