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
        <div className="time-grid">
            {filteredTimes.length > 0 ? (
                filteredTimes.map((time) => (
                    <motion.button
                        key={time}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(time)}
                        className="glass py-3 rounded-lg font-medium transition-all"
                        style={{
                            backgroundColor: selectedTime === time ? 'var(--color-accent)' : undefined,
                            color: 'white',
                            border: selectedTime === time ? 'none' : '1px solid transparent'
                        }}
                    >
                        {time}
                    </motion.button>
                ))
            ) : (
                <div className="col-span-full py-10 text-center text-muted">
                    No hay turnos disponibles para lo que resta del día.
                </div>
            )}
        </div>
    );
};

export default TimeSlots;
