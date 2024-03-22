import { Button, Divider, FormControl, InputLabel, TextField } from '@mui/material';
import '../../css/Login.css';

function Inicio() {
  return (
    <div className="loginPage">
      <div className='cardLogin'>
        <div className='cardLeftLogin'>
          <div className='sombra'>

          </div>
        </div>
        <div className='cardRightLogin'>
          <img src={require('../../images/logotext.png')} style={{width: '40%'}} />
          <div className='loginInputs'>
            <form className='loginForm' onSubmit={() => { }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <TextField
                  label="E-mail"
                  fullWidth
                  margin="normal"
                  name="titulo"
                  // value={redacao.titulo}
                  onChange={() => { }}
                />
                <TextField
                  label="Senha"
                  fullWidth
                  margin="normal"
                  name="titulo"
                  // value={redacao.titulo}
                  onChange={() => { }}
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

export default Inicio;
