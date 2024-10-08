import React from 'react'
import InicioProf from '../pages/Prof/InicioProf'
import InicioAluno from '../pages/Aluno/InicioAluno'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/user'

const Home = () => {
    const user = getUser();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login')
    }
    else {
        {
            if (user.tipo === 'aluno') {
                return (
                    <InicioAluno />
                )
            }
            return (
                <InicioProf />
            )
        }
    }
}
export default Home