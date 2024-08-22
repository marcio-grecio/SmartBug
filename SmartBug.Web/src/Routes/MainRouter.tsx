import Home from '../Views/Home';
import Login from '../Views/Login';
import Leads from '../Views/Leads';
import Usuarios from '../Views/Usuarios';
import MainPage from '../Views/MainPage';
import ProtectedRoutes from './ProtectedRoutes';
import AnonymousRoutes from './AnonymousRoutes';
import PageNotFound from '../Views/PageNotFound';
import Empreendimentos from '../Views/Empreendimentos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<AnonymousRoutes><Login /></AnonymousRoutes>} /> */}
                <Route path="/login" element={<AnonymousRoutes><Login /></AnonymousRoutes>} />
                <Route path="/" element={<ProtectedRoutes perfil={3}><MainPage><Home /></MainPage></ProtectedRoutes>} />
                <Route path="/Home" element={<ProtectedRoutes perfil={3}><MainPage><Home /></MainPage></ProtectedRoutes>} />
                <Route path="/Usuarios" element={<ProtectedRoutes perfil={3}><MainPage><Usuarios /></MainPage></ProtectedRoutes>} />
                <Route path="/Empreendimentos" element={<ProtectedRoutes perfil={3}><MainPage><Empreendimentos /></MainPage></ProtectedRoutes>} />
                <Route path="/Leads" element={<ProtectedRoutes perfil={3}><MainPage><Leads /></MainPage></ProtectedRoutes>} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default MainRouter;
