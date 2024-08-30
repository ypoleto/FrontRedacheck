import React from 'react'
import '../../css/ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className='bodyContent'>
            <img alt='error' className='image' src={require('../../images/404.png')} />
            <h1 className='errorText'>Página não encontrada</h1>
        </div>
    )
}

export default ErrorPage