import './css/App.css';
import NavBar from './pages/NavBar';
import { Outlet } from 'react-router-dom';
import { fetchUser, isAuthenticated } from './services/auth'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
    }
    else {
      navigate('/')
    }
  }, [])

  
  return (
    <div className="App">
      {isAuthenticated &&
        <NavBar />
      }
      <Outlet />
    </div>
  );
}

export default App;
