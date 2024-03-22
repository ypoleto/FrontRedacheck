import React from 'react'
import InicioProf from '../pages/Prof/InicioProf'
import InicioAluno from '../pages/Aluno/InicioAluno'
import Login from '../pages/Login/Login'
import { usuario } from '../user'

const Home = () => {
    // if (usuario.perfil == 'aluno') {
    //     return (
    //         <InicioAluno/>
    //     )
    // }
    // return (
    //     <InicioProf />
    // )
    return (
        <Login />
    )
}

export default Home