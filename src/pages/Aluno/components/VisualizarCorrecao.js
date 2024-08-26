import { Card, CardContent, CardHeader } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigation from '../../../components/Navigation'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

function ListaRedacoes() {

    const [loading, setLoading] = useState([]);
    const [redacao, setRedacao] = useState();
    const [correcao, setCorrecao] = useState();
    let [searchParams, setSearchParams] = useSearchParams();


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
                                <h2 className='font-semibold text-lg mb-3'>{redacao.titulo}</h2>
                                <span className='font-light'>{redacao.texto}</span>
                            </div>
                        </div>
                    </div>

                    <div className='shadow-md w-full col-span-1 overflow-auto' style={{ maxHeight: '40vh' }}>
                        <div className='flex flex-col h-full justify-between'>
                            <div>
                                <div className='bg-gray-100 rounded-t-md p-2'>
                                    <h1>Comentários da correção</h1>
                                </div>
                                <div className='flex text-left flex-col p-4'>
                                    <span>{correcao.comentarios}</span>
                                </div>
                            </div>
                            <div className='bg-gray-100 rounded-b-md p-2 '>
                                <span className='flex text-start'>Nota: {correcao.nota}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            console.log('redacao', redacao);
            console.log('correcao', correcao);
            return (
                <>
                    Nada
                </>

            )
        }
    }

    const fetchCorrecao = async (redacao_id) => {
        setLoading(true)
        axios.get(`http://localhost:8000/correcoes/redacao/${redacao_id}`)
            .then(response => {
                console.log('correcao', response.data);
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

    useEffect(() => {
        fetchCorrecao(searchParams.get('redacao_id'));
        fetchRedacao(searchParams.get('redacao_id'));
    }, [])

    return (
        <>
            <div>
                <Navigation back={true} link='/'/>
            </div>
            {getCorrecao()}
        </>
    );
}

export default ListaRedacoes;
