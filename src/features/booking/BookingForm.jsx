import React from 'react';

const Input = ({ label, ...props }) => (
    <div className="input-group">
        <label className="text-sm font-medium text-muted">{label}</label>
        <input
            className="input-field"
            {...props}
        />
    </div>
);

const BookingForm = ({ formData, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    return (
        <div className="form-grid">
            <Input
                label="Nombre Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                required
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                required
            />
            <Input
                label="Teléfono"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 11 ..."
                required
            />
            <Input
                label="Modelo de Bicicleta"
                name="bikeModel"
                type="text"
                value={formData.bikeModel}
                onChange={handleChange}
                placeholder="Trek Marlin 5"
                required
            />
        </div>
    );
};

export default BookingForm;
