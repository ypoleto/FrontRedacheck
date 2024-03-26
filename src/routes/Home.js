import React from 'react'
import InicioProf from '../pages/Prof/InicioProf'
import InicioAluno from '../pages/Aluno/InicioAluno'
import { getUser } from '../utils/user'

const Home = () => {
    
    if (getUser().tipo == 'aluno') {
        return (
            <InicioAluno />
        )
    }
    return (
        <InicioProf />
    )
}
export default Home