import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../css/NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function NavBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <div className="nav">
      <div><Link to="/"><HomeIcon color='primary' /></Link></div>
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
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onMouseLeave={handleClose}
        >
          <MenuItem onClick={handleClose}> <AddOutlinedIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/proposta">Nova proposta</Link></MenuItem>
          <MenuItem onClick={handleClose}> <PersonIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/">Minha conta</Link></MenuItem>
          <MenuItem onClick={handleClose}> <InfoOutlinedIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/sobre">Sobre</Link></MenuItem>
          <MenuItem onClick={handleClose}> <LogoutIcon style={{ paddingRight: 10 }} fontSize='small' /> Sair</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
