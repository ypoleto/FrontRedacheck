import './css/App.css';
import NavBar from './pages/NavBar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:27017';

function App() {
  return (
      <div className="App">
        <NavBar />
        <Outlet/>
      </div>
  );
}

export default App;
