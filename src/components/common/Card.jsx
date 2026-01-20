import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
    // We keep the dynamic class capability but rely on index.css for 'glass'
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' } : {}}
            className={`glass rounded-2xl p-6 ${className}`}
            {...props}
            style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                ...props.style
            }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
