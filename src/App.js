import './css/App.css';
import NavBar from './components/NavBar';
import Proposta from './components/Proposta/Proposta';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <NavBar />
        <Proposta />
      </div>
    </LocalizationProvider>
  );
}

export default App;
