import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

function ListaRedacoes() {

    const [loading, setLoading] = useState([]);
    const [redacao, setRedacao] = useState([]);
    const [correcao, setCorrecao] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();


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

    useEffect(() => {
        fetchCorrecao(searchParams.get('redacao_id'));
        fetchRedacao(searchParams.get('redacao_id'));
    }, [])

    return (
        <div className="container">
            <div className='boxCorrecao' style={{marginBottom: 10}}>
                <h1>Redacao</h1>                
                <h2>{redacao.titulo}</h2>
                <span>{redacao.texto}</span>
            </div>

            <div className='boxCorrecao'>
                <h1>Correcao</h1>                
                <span>{correcao.nota}</span>
                <span>{correcao.comentarios}</span>
            </div>
        </div>
    );
}

export default ListaRedacoes;
