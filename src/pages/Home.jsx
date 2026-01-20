import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container flex-col items-center justify-center text-center" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col items-center"
            >
                <div style={{ marginBottom: '1.5rem' }}>
                    <span className="text-primary text-sm font-medium" style={{
                        background: 'rgba(59,130,246,0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: 'var(--color-primary)'
                    }}>
                        ✨ Servicio Premium de Bicicletas
                    </span>
                </div>

                <h1 className="text-5xl md-text-7xl font-bold mb-6">
                    Tu Bici Merece <br />
                    <span className="text-gradient">Lo Mejor</span>
                </h1>
                <p className="text-lg text-muted mb-10" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Reserva tu turno en segundos. Mecánicos expertos, repuestos originales y una atención exclusiva para que solo te preocupes por pedalear.
                </p>

                <div className="flex flex-col md-flex gap-4 justify-center items-center" style={{ flexDirection: 'row' }}>
                    <Button onClick={() => navigate('/reservar')} className="text-lg" style={{ padding: '1rem 2rem' }}>
                        Reservar Ahora <ArrowRight size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-lg"
                        style={{ padding: '1rem 2rem' }}
                        onClick={() => document.getElementById('services-preview')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Ver Servicios
                    </Button>
                </div>

                <div className="mt-10 flex gap-8 justify-center text-muted">
                    <div className="flex-col items-center flex">
                        <div className="flex mb-4" style={{ color: '#fbbf24' }}>
                            <Star fill="currentColor" size={20} /> <Star fill="currentColor" size={20} /> <Star fill="currentColor" size={20} /> <Star fill="currentColor" size={20} /> <Star fill="currentColor" size={20} />
                        </div>
                        <span className="text-sm">4.9/5 Calificación</span>
                    </div>
                    <div className="flex-col items-center flex">
                        <span className="font-bold text-white text-xl">500+</span>
                        <span className="text-sm">Bicis reparadas</span>
                    </div>
                </div>
            </motion.div>

            {/* Services Preview Section */}
            <div id="services-preview" className="w-full mt-32 mb-20 services-section">
                <h2 className="text-3xl font-bold mb-10 text-white">Nuestros Servicios Destacados</h2>
                <div className="services-grid text-left">
                    {[
                        { title: 'Tune-Up Completo', price: '$50.000', desc: 'Limpieza profunda, ajuste de cambios y frenos, lubricación premium.' },
                        { title: 'Reparación Express', price: '$15.000', desc: 'Solución rápida para pinchazos y ajustes menores en el acto.' },
                        { title: 'Service General', price: '$40.000', desc: 'Desarme completo, revisión de rodamientos y centrado de ruedas.' }
                    ].map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3 className="text-xl font-bold mb-2 text-white">{s.title}</h3>
                            <p className="text-muted mb-4">{s.desc}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-accent">{s.price}</span>
                                <Button variant="ghost" onClick={() => navigate('/reservar')} style={{ fontSize: '0.9rem' }}>
                                    Agendar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
