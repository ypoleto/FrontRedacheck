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
                <Link to={props.link}>
                    <Button variant='contained' onClick={props.func}>
                        <Tooltip title={props.tooltip}>
                            <AddIcon />
                        </Tooltip>
                    </Button>
                </Link>
            ) :
                <></>
            }
        </div>
    )
}

export default TitleBoxes