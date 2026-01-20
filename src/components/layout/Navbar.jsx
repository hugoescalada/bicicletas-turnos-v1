import React from 'react';
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="container w-full flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <Bike className="text-accent" size={32} />
                    <span className="text-white">Cycle<span className="text-gradient">Fix</span></span>
                </Link>
                <div className="hidden md-flex items-center gap-8">
                    <Link to="/" className="nav-link transition-colors">Inicio</Link>
                    <Link to="/reservar" className="nav-btn-primary transition-colors">
                        Reservar Turno
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
