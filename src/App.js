import './css/App.css';
import NavBar from './pages/NavBar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  const logado = false;
  return (
    <div className="App">
      {logado &&
        <NavBar />
      }
      <Outlet />
    </div>
  );
}

export default App;
