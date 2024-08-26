import { Button, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { Link } from 'react-router-dom';
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