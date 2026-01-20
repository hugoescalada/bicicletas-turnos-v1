import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="container flex-col items-center justify-center text-center" style={{ minHeight: '60vh', display: 'flex' }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
            >
                <div className="flex justify-center mb-6">
                    <CheckCircle size={80} className="text-accent" />
                </div>
                <h1 className="text-4xl font-bold mb-4">¡Reserva Confirmada!</h1>
                <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>
                    Te hemos enviado los detalles a tu correo electrónico. Te esperamos en CycleFix para dejar tu bici como nueva.
                </p>
                <Button onClick={() => navigate('/')}>
                    Volver al Inicio
                </Button>
            </motion.div>
        </div>
    );
};

export default Success;
