import { Button } from '@mui/material'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


const TitleBoxes = (props) => {
    let navigate = useNavigate();
    const handleNavigateButton = () => {
        navigate({
            pathname: props.link,
        })
    }

    return (
        <div className='tituloBox'>
            {props.back ? (
                <div>
                    <ArrowBackIosIcon className='!text-sm text-blue-600' />
                    <Button onClick={() => handleNavigateButton()}>Voltar</Button>
                </div>
            ) :
                <></>
            }
        </div>
    )
}

export default TitleBoxes