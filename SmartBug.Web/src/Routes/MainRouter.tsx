import Home from '../Views/Home';
import Metas from '../Views/Metas';
import Login from '../Views/Login';
import Leads from '../Views/Leads';
import Canais from '../Views/Canais';
import Vendas from '../Views/Vendas';
import Clientes from '../Views/Clientes';
import Usuarios from '../Views/Usuarios';
import MainPage from '../Views/MainPage';
import Proposta from '../Views/Proposta';
import Descartados from '../Views/Descartados';
import ProtectedRoutes from './ProtectedRoutes';
import AnonymousRoutes from './AnonymousRoutes';
import PageNotFound from '../Views/PageNotFound';
import Empreendimentos from '../Views/Empreendimentos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AnonymousRoutes><Login /></AnonymousRoutes>} />
                <Route path="/" element={<ProtectedRoutes perfil={3}><MainPage><Home /></MainPage></ProtectedRoutes>} />
                <Route path="/Home" element={<ProtectedRoutes perfil={3}><MainPage><Home /></MainPage></ProtectedRoutes>} />
                <Route path="/Metas" element={<ProtectedRoutes perfil={2}><MainPage><Metas /></MainPage></ProtectedRoutes>} />
                <Route path="/Leads" element={<ProtectedRoutes perfil={2}><MainPage><Leads /></MainPage></ProtectedRoutes>} />
                <Route path="/Canais" element={<ProtectedRoutes perfil={2}><MainPage><Canais /></MainPage></ProtectedRoutes>} />
                <Route path="/Vendas" element={<ProtectedRoutes perfil={2}><MainPage><Vendas /></MainPage></ProtectedRoutes>} />
                <Route path="/Usuarios" element={<ProtectedRoutes perfil={1}><MainPage><Usuarios /></MainPage></ProtectedRoutes>} />
                <Route path="/Clientes" element={<ProtectedRoutes perfil={2}><MainPage><Clientes /></MainPage></ProtectedRoutes>} />
                <Route path="/Propostas" element={<ProtectedRoutes perfil={2}><MainPage><Proposta /></MainPage></ProtectedRoutes>} />
                <Route path="/Descartados" element={<ProtectedRoutes perfil={2}><MainPage><Descartados /></MainPage></ProtectedRoutes>} />
                <Route path="/Empreendimentos" element={<ProtectedRoutes perfil={2}><MainPage><Empreendimentos /></MainPage></ProtectedRoutes>} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default MainRouter;
