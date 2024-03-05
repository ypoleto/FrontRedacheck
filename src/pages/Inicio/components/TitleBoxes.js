import { Button, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { Link } from 'react-router-dom';

const TitleBoxes = (props) => {
    return (
        <div className='tituloBox'>
            <span>
                {props.title}
            </span>
            {props.add ? (
                <Button variant='info' onClick={props.func}>
                    <Link to={props.link}>
                        <Tooltip title={props.tooltip}>
                            <AddIcon />
                        </Tooltip>
                    </Link>
                </Button>
            ) :
                <></>
            }
        </div>
    )
}

export default TitleBoxes