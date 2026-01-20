import React from 'react';
import { motion } from 'framer-motion';

const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const TimeSlots = ({ selectedTime, onSelect, selectedDate }) => {
    const getFilteredTimes = () => {
        const now = new Date();
        const isToday = selectedDate &&
            selectedDate.getDate() === now.getDate() &&
            selectedDate.getMonth() === now.getMonth() &&
            selectedDate.getFullYear() === now.getFullYear();

        if (!isToday) return times;

        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        return times.filter(time => {
            const [hour, minutes] = time.split(':').map(Number);
            // Mostrar turnos con al menos 1 hora de anticipación si es hoy
            if (hour > currentHour + 1) return true;
            if (hour === currentHour + 1 && minutes >= currentMinutes) return true;
            return false;
        });
    };

    const filteredTimes = getFilteredTimes();

    return (
        <div className="time-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
            {filteredTimes.length > 0 ? (
                filteredTimes.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                        <motion.button
                            key={time}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ backgroundColor: isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.15)' }}
                            onClick={() => onSelect(time)}
                            className={`flex items-center justify-center font-black text-2xl transition-all`}
                            style={{
                                padding: '1.25rem 1rem',
                                background: isSelected
                                    ? 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                color: isSelected ? 'white' : 'var(--color-primary)',
                                border: isSelected
                                    ? '1px solid white'
                                    : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '1rem',
                                boxShadow: isSelected
                                    ? '0 0 20px rgba(59, 130, 246, 0.5)'
                                    : '0 4px 6px rgba(0, 0, 0, 0.2)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {time}
                        </motion.button>
                    );
                })
            ) : (
                <div className="col-span-full py-20 text-center text-muted text-lg glass rounded-2xl">
                    No hay turnos disponibles para lo que resta del día.
                </div>
            )}
        </div>
    );
};

export default TimeSlots;
