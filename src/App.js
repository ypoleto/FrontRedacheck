import './css/App.css';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <NavBar />
        <Outlet/>
        <Footer />
      </div>
  );
}

export default App;
