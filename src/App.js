import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Agendamento from './pages/Agendamento';
import Sucesso from './pages/Sucesso';

import HomeAdmin from './pages/Admin/HomeAdmin';
import AgendaCamilly from './pages/Admin/AgendaCamilly';
import Disponibilidade from './pages/Admin/Disponibilidade';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/sucesso" element={<Sucesso />} />

      {/* Admin */}
      import HomeAdmin from './pages/Admin/HomeAdmin';

      <Route path="/admin" element={<HomeAdmin />} />
      <Route path="/admin/agenda" element={<AgendaCamilly />} />
      <Route path="/admin/disponibilidade" element={<Disponibilidade />} />
    </Routes>
  );
}

export default App;
