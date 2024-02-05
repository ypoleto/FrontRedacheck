import '../../css/Inicio.css';
import ListaTurmas from './components/ListaTurmas';
import ListaRedacoes from './components/ListaRedacoes';

function Inicio() {
  return (
    <div className="container">
      <div>
        <ListaTurmas />
      </div>
      <div>
        <ListaRedacoes />
      </div>
    </div>
  );
}

export default Inicio;
