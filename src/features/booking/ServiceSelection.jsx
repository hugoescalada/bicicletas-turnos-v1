import React from 'react';
import Card from '../../components/common/Card';
import { Wrench, Disc, Settings } from 'lucide-react';

const services = [
    { id: 'tuneup', name: 'Tune-Up Completo', price: '$50.000', icon: Settings, desc: 'Ajuste general, frenos y cambios.' },
    { id: 'flatfix', name: 'Reparación Pinchazo', price: '$5.000', icon: Disc, desc: 'Cambio de cámara y revisión de cubierta.' },
    { id: 'repair', name: 'Reparación General', price: '$80.000', icon: Wrench, desc: 'Diagnóstico y reparación de fallas.' },
];

const ServiceSelection = ({ selectedService, onSelect }) => {

    const handleSelect = (id) => {
        onSelect(id);
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    };

    return (
        <div className="services-grid">
            <style>{`
                .force-no-selection *::selection {
                    background: transparent !important;
                    color: inherit !important;
                }
                .force-no-selection *::-moz-selection {
                    background: transparent !important;
                    color: inherit !important;
                }
            `}</style>

            {services.map((service) => (
                <Card
                    key={service.id}
                    hover={true}
                    className={`cursor-pointer transition-all duration-300 noselect force-no-selection ${selectedService === service.id ? 'transform scale-[1.02]' : ''}`}
                    style={{
                        border: selectedService === service.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                        background: selectedService === service.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.4)',
                        boxShadow: selectedService === service.id ? '0 0 20px rgba(59, 130, 246, 0.1)' : 'none',
                        position: 'relative',
                        outline: 'none',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    onClick={() => handleSelect(service.id)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <div className="flex-col items-center text-center gap-4 flex relative" style={{ zIndex: 1, pointerEvents: 'none' }}>
                        {selectedService === service.id && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-15px',
                                    width: '12px',
                                    height: '12px',
                                    background: 'var(--color-accent)',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px var(--color-accent)'
                                }}
                            />
                        )}
                        <div
                            className="p-4 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{
                                // Eliminamos completamente cualquier cambio de borde o fondo en el circulo del icono
                                // para evitar el renderizado cuadrado indeseado del navegador.
                                background: 'rgba(30,41,59,0.5)',
                                border: '2px solid transparent',
                                boxShadow: 'none',
                                outline: 'none'
                            }}
                        >
                            {/* Cambiamos el color del icono a Verde Eléctrico cuando está seleccionado */}
                            <service.icon
                                size={32}
                                className={selectedService === service.id ? "text-accent" : "text-white"}
                                draggable={false}
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white">{service.name}</h3>
                        <p className="text-muted">{service.desc}</p>
                        <span className="text-2xl font-bold text-accent">{service.price}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ServiceSelection;
