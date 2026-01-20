import React from 'react';
import { motion } from 'framer-motion';

const getNextDays = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
};

const Calendar = ({ selectedDate, onSelect }) => {
    const days = getNextDays(14);

    return (
        <div className="calendar-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '1rem',
            padding: '0.5rem'
        }}>
            {days.map((date, index) => {
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                return (
                    <motion.button
                        key={index}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ backgroundColor: isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.15)' }}
                        onClick={() => onSelect(date)}
                        className={`flex flex-col items-center justify-center gap-0 transition-all`}
                        style={{
                            padding: '1.25rem 0.5rem',
                            background: isSelected
                                ? 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%)'
                                : 'rgba(255, 255, 255, 0.08)',
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
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-white/90' : 'text-primary'}`} style={{ color: !isSelected ? 'var(--color-primary)' : undefined }}>
                            {date.toLocaleDateString('es-ES', { weekday: 'long' })}
                        </span>
                        <span className={`text-3xl font-black ${isSelected ? 'text-white' : ''}`} style={{ lineHeight: '1', color: !isSelected ? 'var(--color-primary)' : 'white' }}>
                            {date.getDate()}
                        </span>
                        <span className={`text-[9px] font-bold ${isSelected ? 'text-white/80' : 'text-muted'}`}>
                            {date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default Calendar;
