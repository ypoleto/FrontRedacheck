import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import '../css/NavBar.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/user';
import SettingsIcon from '@mui/icons-material/Settings';

function NavBar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [usuario, setUsuario] = useState({ nome: "" });

  const navigate = useNavigate();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem('token')
    navigate('/login')
  }
  const handleSettings = () => {
    handleClose();
    navigate('/settings')
  }

  useEffect(() => {
    setUsuario(getUser())
  }, []);

  return (
    < div className="nav" >
      <div style={{ display: 'grid', gridAutoFlow: 'column', gap: 50, alignItems: 'center' }}>
        <Link to="/"><img className='imgLogo' alt='logo' src={require('../images/logo.png')}></img></Link>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
      </div>
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleIconClick}
          onMouseEnter={handleIconClick}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{usuario.nome[0]}</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onMouseLeave={handleClose}
        >
          {/* <MenuItem onClick={handleClose}> <PersonIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/">Minha conta</Link></MenuItem> */}
          <MenuItem onClick={handleLogout}> <LogoutIcon style={{ paddingRight: 10 }} fontSize='medium' /> Sair</MenuItem>
          {/* <MenuItem onClick={handleSettings}> <SettingsIcon style={{ paddingRight: 10 }} fontSize='medium' /> Gerenciar</MenuItem> */}
        </Menu>
      </div>
    </div >
  );
}

export default NavBar;
