import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
    const { settings } = useSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p>© {currentYear} {settings.businessName} Premium. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
