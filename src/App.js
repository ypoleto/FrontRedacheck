import './css/App.css';
import NavBar from './pages/NavBar';
import { Outlet } from 'react-router-dom';
import { isAuthenticated } from './services/auth'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
    }
  })

  
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
