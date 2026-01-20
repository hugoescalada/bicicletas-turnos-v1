import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, UserCircle, Wrench, Shield, Zap } from 'lucide-react';
import Button from '../common/Button';
import { useSettings } from '../../context/SettingsContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { settings } = useSettings();

    const getIcon = (iconName) => {
        switch (iconName?.toLowerCase()) {
            case 'bike': return <Bike className="text-accent" size={32} />;
            case 'wrench': return <Wrench className="text-accent" size={32} />;
            case 'shield': return <Shield className="text-accent" size={32} />;
            case 'zap': return <Zap className="text-accent" size={32} />;
            default: return <Bike className="text-accent" size={32} />;
        }
    };

    return (
        <nav className="navbar glass">
            <div className="container w-full flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    {getIcon(settings.businessLogo)}
                    <span className="text-white">{settings.businessName}</span>
                </Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <Link to="/reservar" className="nav-btn-primary transition-colors text-sm md:text-base">
                        Reservar Turno
                    </Link>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin')}
                        className="p-2 md:px-4"
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '999px'
                        }}
                    >
                        <UserCircle size={18} className="text-accent" />
                        <span className="hidden sm:inline">Admin</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
