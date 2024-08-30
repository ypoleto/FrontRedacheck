import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigation from '../../../components/Navigation'
import { useSearchParams } from 'react-router-dom';
import '../../../utils/TipTap/stylevisu.css'

function ListaRedacoes() {

    const [loading, setLoading] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [redacao, setRedacao] = useState();
    const [correcao, setCorrecao] = useState({});
    const [highlightedId, setHighlightedId] = useState(null);
    let [searchParams] = useSearchParams();
    
    const applyHighlight = (html) => {
        return html.replace(
            /<p data-id="([^"]*)"/g,
            (match, id) => {
                const className = id === highlightedId ? 'highlighted' : '';
                return `<p data-id="${id}" class="${className}"`;
            }
        );
    };

    const fetchComentariosCorrecao = (id) => {
        var body = { params: { correcao_id: id } }
        setLoading(true);
        axios.get(`http://localhost:8000/comentarios`, body)
            .then(response => {
                setComentarios(response.data);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    const fetchCorrecao = async (redacao_id) => {
        setLoading(true)
        axios.get(`http://localhost:8000/correcoes/redacao/${redacao_id}`)
            .then(response => {
                setCorrecao(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const fetchRedacao = async (redacao_id) => {
        setLoading(true)
        axios.get(`http://localhost:8000/redacoes/${redacao_id}`)
            .then(response => {
                setRedacao(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const handleCommentHover = (paragrafo_id) => {
        setHighlightedId(paragrafo_id);
    };

    const handleCommentLeave = () => {
        setHighlightedId(null);
    };


    useEffect(() => {
        fetchCorrecao(searchParams.get('redacao_id'));
        fetchRedacao(searchParams.get('redacao_id'));
    }, [])

    useEffect(() => {
        if (correcao.correcao_id) fetchComentariosCorrecao(correcao.correcao_id);
    }, [correcao])


    const getComentariosCorrecao = () => {
        return (
            <>
                {comentarios.map(element => (
                    <div
                        key={element.comentario_id} className='p-2 border m-2 rounded-md hover:cursor-pointer'
                        onMouseEnter={() => handleCommentHover(element.paragrafo_id)}
                        onMouseLeave={handleCommentLeave}>
                        <span>
                            {element.comentario}
                        </span>
                    </div>
                ))}
            </>
        )
    }


    const getCorrecao = () => {

        if (correcao && redacao) {
            return (
                <div className='m-10 grid grid-cols-3 gap-10'>
                    <div className='shadow-md w-full col-span-2 overflow-auto' style={{ maxHeight: '80vh' }}>
                        <div>
                            <div className='bg-gray-100 rounded-t-md p-2'>
                                <h1>Redação</h1>
                            </div>
                            <div className='flex text-left flex-col p-4'>
                                <h2 className='text-xl font-semibold mb-5 text-center'>{redacao.titulo}</h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: applyHighlight(redacao.texto) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='shadow-md w-full col-span-1 overflow-auto' style={{ maxHeight: '40vh' }}>
                        <div className='flex flex-col h-full justify-between'>
                            <div>
                                <div className='bg-gray-100 rounded-t-md p-2'>
                                    <h1>Comentários da correção</h1>
                                </div>
                                <div>
                                    {getComentariosCorrecao()}
                                </div>
                            </div>
                            <div className='bg-gray-100 rounded-b-md p-2 '>
                                <span className='flex text-start'>Nota: {correcao.nota}</span>
                            </div>
                        </div>
                    </div>
                </div >
            )
        }
        else {
            return (
                <>
                    Nada
                </>

            )
        }
    }

    return (
        <>
            <div>
                <Navigation back={true} link='/' />
            </div>
            {getCorrecao()}
        </>
    );
}

export default ListaRedacoes;
