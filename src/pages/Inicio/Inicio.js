import '../../css/Inicio.css';
import ListaTurmas from './components/Turmas/ListaTurmas';
import ListaRedacoes from './components/Redacoes/ListaRedacoes';

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
