import React from 'react';
import { motion } from 'framer-motion';

const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const TimeSlots = ({ selectedTime, onSelect }) => {
    return (
        <div className="time-grid">
            {times.map((time) => (
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
            ))}
        </div>
    );
};

export default TimeSlots;
