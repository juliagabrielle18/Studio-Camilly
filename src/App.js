import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Agendamento from './pages/Agendamento';
import Sucesso from './pages/Sucesso'; // <--- importe a tela

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/sucesso" element={<Sucesso />} /> {/* <-- adicione essa linha */}
      </Routes>
    </Router>
  );
}

export default App;
