import React from 'react';
import { motion } from 'framer-motion';

const getNextDays = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        dates.push(d);
    }
    return dates;
};

const Calendar = ({ selectedDate, onSelect }) => {
    const days = getNextDays(14);

    return (
        <div className="calendar-grid">
            {days.map((date, index) => {
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                return (
                    <motion.button
                        key={index}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(date)}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all ${isSelected ? 'selected' : 'glass'}`}
                        style={{
                            backgroundColor: isSelected ? 'var(--color-primary)' : undefined,
                            borderColor: isSelected ? 'var(--color-primary)' : 'transparent',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                        }}
                    >
                        <span className={`text-sm ${isSelected ? 'text-white' : 'text-muted'}`}>
                            {date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-xl font-bold text-white">
                            {date.getDate()}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default Calendar;
