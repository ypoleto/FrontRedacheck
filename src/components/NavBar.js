import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../css/NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({anchorEl, setAnchorEl}) {


  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <div className="nav">
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleIconClick}
          onMouseEnter={handleIconClick}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>Y</Avatar>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onMouseLeave={handleClose}
        >
          <MenuItem onClick={handleClose}> <AddOutlinedIcon style={{ paddingRight: 10 }} fontSize='small' /> Propor redação</MenuItem>
          <MenuItem onClick={handleClose}> <PersonIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/proposta">Minha conta</Link></MenuItem>
          <MenuItem onClick={handleClose}> <InfoOutlinedIcon style={{ paddingRight: 10 }} fontSize='small' /> Sobre</MenuItem>
          <MenuItem onClick={handleClose}> <LogoutIcon style={{ paddingRight: 10 }} fontSize='small' /> Sair</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
