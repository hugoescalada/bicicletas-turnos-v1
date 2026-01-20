import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Success from './pages/Success';
import Admin from './pages/Admin';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="reservar" element={<Booking />} />
                <Route path="exito" element={<Success />} />
                <Route path="admin" element={<Admin />} />
            </Route>
        </Routes>
    );
}

export default App;
