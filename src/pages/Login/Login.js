import { Button, Divider, FormControl, InputLabel, TextField } from '@mui/material';
import '../../css/Login.css';
import { useEffect, useState } from 'react';
import { isAuthenticated, loginUser } from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
function LoginPage() {

  const [login, setLogin] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  },[])

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const { username, password } = login
    var dados = {
      username,
      password
    }
    try {
      console.log(typeof dados);
      const response = await api.post("/token", dados);
      console.log('response', response);
      loginUser(response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }

  };

  return (
    <div className="loginPage">
      <div className='cardLogin'>
        <div className='cardLeftLogin'>
          <div className='sombra'>

          </div>
        </div>
        <div className='cardRightLogin'>
          <img src={require('../../images/logotext.png')} style={{ width: '40%' }} />
          <div className='loginInputs'>
            <form className='loginForm' onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <TextField
                  label="Usuario"
                  fullWidth
                  margin="normal"
                  name="username"
                  value={login.username}
                  onChange={handleChange}
                />
                <TextField
                  label="Senha"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                />
                <Button size='small' style={{ textTransform: 'none', justifyContent: 'right', marginTop: '-15px' }}>Esqueceu sua senha?</Button>
              </div>
              <Button type='submit' fullWidth size='large' variant='contained'>
                Entrar
              </Button>
            </form>
          </div>
          <div style={{ width: '80%', fontSize: 14 }}>
            <Divider>ou</Divider>
          </div>
          <span style={{ fontSize: 14 }}>
            Você é novo?
            <Button size='small' style={{ textTransform: 'none' }}>Cadastre-se</Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
