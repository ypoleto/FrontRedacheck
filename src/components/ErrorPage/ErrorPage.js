import React from 'react'
import './ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className='bodyContent'>
            <img className='image' src={require('../../images/404.png')} />
            <h1 className='errorText'>Página não encontrada</h1>
        </div>
    )
}

export default ErrorPage