import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../css/NavBar.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOKEN_KEY, getToken } from '../services/auth';
import { getUser } from '../utils/user';

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

  useEffect(() => {
    setUsuario(getUser())
  }, []);

  return (
    < div className="nav" >
      <div style={{ display: 'grid', gridAutoFlow: 'column', gap: 50, alignItems: 'center' }}>
        <Link to="/"><img className='imgLogo' src={require('../images/logo.png')}></img></Link>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        {usuario.tipo === 'professor' && (
          <Link to="/novaproposta">Nova proposta</Link>
        )}
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
          <MenuItem onClick={handleClose}> <PersonIcon style={{ paddingRight: 10 }} fontSize='small' /> <Link to="/">Minha conta</Link></MenuItem>
          <MenuItem onClick={handleLogout}> <LogoutIcon style={{ paddingRight: 10 }} fontSize='small' /> Sair</MenuItem>
        </Menu>
      </div>
    </div >
  );
}

export default NavBar;
