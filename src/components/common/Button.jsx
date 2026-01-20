import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = 'btn';

    const getStyle = () => {
        const styles = {
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer',
            border: 'none', // Reset default border
            outline: 'none' // Reset default outline
        };

        if (variant === 'primary') {
            return {
                ...styles,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                color: 'white',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            }
        }
        if (variant === 'outline') {
            return {
                ...styles,
                background: 'transparent',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
            }
        }
        if (variant === 'ghost') {
            return {
                ...styles,
                background: 'rgba(255, 255, 255, 0.05)', // Added slight background to ghost for visibility
                border: '1px solid rgba(255, 255, 255, 0.1)', // Added subtle border
                color: 'var(--color-text-muted)',
            }
        }
        return styles;
    }

    // Correctly merge internal styles with any style prop passed (e.g. for opacity)
    const combinedStyle = { ...getStyle(), ...(props.style || {}) };
    const { style, ...restProps } = props;

    return (
        <motion.button
            whileHover={!props.disabled ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
            whileTap={!props.disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            style={combinedStyle}
            className={`${baseStyles} ${className}`}
            {...restProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;
