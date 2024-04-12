import { Button, Divider, TextField, Backdrop, CircularProgress, Alert } from '@mui/material';
import '../../css/Login.css';
import { useEffect, useState } from 'react';
import { isAuthenticated, loginUser } from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingButton from '@mui/lab/LoadingButton';
function LoginPage() {

  const [login, setLogin] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [])

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const { username, password } = login
    var dados = {
      username,
      password
    }
    try {
      console.log(typeof dados);
      const response = await api.post("/token", dados);
      loginUser(response.data.access_token);
      navigate("/");
    } catch (error) {
      console.log('Ocorreu um erro:', error.request.status);
      if (error.request.status === 401) {
        setError({message: "Usuário ou senha inválidos!", code: 401})
      }
      setLoading(false)
    }
  };

  return (
    <div className="loginPage">
      <div className='cardLogin'>
        <>
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
                    type='password'
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                  />
                  {error &&(
                    <Alert severity="error">{error.message}</Alert>
                  )}
                </div>
                <LoadingButton loadingPosition="start" loading={loading} type='submit' fullWidth size='large' variant='contained'>
                  Entrar
                </LoadingButton>
              </form>
            </div>
            <div style={{ width: '80%', fontSize: 14 }}>
              <Divider>ou</Divider>
            </div>
            <span style={{ fontSize: 14 }}>
              Você é novo?
              <Button onClick={() => navigate('/signup')} size='small' style={{ textTransform: 'none' }}>Cadastre-se</Button>
            </span>
          </div>
        </>
      </div>
    </div>
  );
}

export default LoginPage;
