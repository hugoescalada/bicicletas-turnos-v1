import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Calendar, Clock, User, Phone, Mail, Bike, Search, Filter, Edit3, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterService, setFilterService] = useState('all');
    const [filterStatus, setFilterStatus] = useState('pending'); // 'pending', 'completed', 'all'

    // Notes State (para feedback visual de guardado)
    const [savingNoteId, setSavingNoteId] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Credenciales incorrectas');
        }
    };

    const fetchBookings = () => {
        fetch('http://localhost:3000/api/bookings')
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar datos');
                return res.json();
            })
            .then(data => {
                setBookings(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchBookings();
        }
    }, [isLoggedIn]);

    const handleUpdateNote = async (id, newNote) => {
        // Optimistic update locally
        setBookings(prev => prev.map(b => b.id === id ? { ...b, adminNotes: newNote } : b));
        setSavingNoteId(id);

        try {
            const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminNotes: newNote })
            });

            if (!res.ok) throw new Error('Failed to update');

            // Show success briefly
            setTimeout(() => setSavingNoteId(null), 1000);
        } catch (err) {
            console.error(err);
            setSavingNoteId(null);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        // Optimistic update
        setBookings(prev => prev.map(b => b.id === id ? { ...b, completed: newStatus } : b));

        try {
            await fetch(`http://localhost:3000/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: newStatus })
            });
        } catch (err) {
            console.error(err);
            // Revert on error
            setBookings(prev => prev.map(b => b.id === id ? { ...b, completed: currentStatus } : b));
        }
    };

    // Filtrado de datos
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toString().includes(searchTerm);

        const matchesService = filterService === 'all' || booking.serviceId === filterService;

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'pending' && !booking.completed) ||
            (filterStatus === 'completed' && !!booking.completed);

        return matchesSearch && matchesService && matchesStatus;
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        // Si viene con T (ISO), tomamos solo la fecha
        const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
        // Dividimos por el guion
        const parts = cleanDate.split('-');
        if (parts.length === 3) {
            // Reordenamos de YYYY-MM-DD a DD-MM-YYYY
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return cleanDate;
    };

    const getServiceLabel = (id) => {
        switch (id) {
            case 'tuneup': return 'Tune-Up Completo';
            case 'flatfix': return 'Reparación Pinchazo';
            case 'repair': return 'Reparación General';
            default: return id;
        }
    };

    const getServiceColor = (id) => {
        switch (id) {
            case 'tuneup': return 'rgba(59, 130, 246, 0.2)';
            case 'flatfix': return 'rgba(16, 185, 129, 0.2)';
            case 'repair': return 'rgba(245, 158, 11, 0.2)';
            default: return 'rgba(148, 163, 184, 0.2)';
        }
    };

    const styles = `
        .admin-table-container {
            overflow-x: auto;
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0,0,0,0.3);
            backdrop-filter: blur(8px);
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        /* Mobile Stack Layout for Table */
        @media (max-width: 992px) {
            .admin-table thead {
                display: none; /* Hide headers on mobile */
            }
            .admin-table tr {
                display: block;
                margin-bottom: 1.5rem;
                padding: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.02);
            }
            .admin-table td {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                text-align: right;
            }
            .admin-table td:last-child {
                border-bottom: none;
            }
            .admin-table td::before {
                content: attr(data-label);
                font-size: 0.7rem;
                font-weight: 800;
                text-transform: uppercase;
                color: var(--color-text-muted);
                text-align: left;
                margin-right: 1rem;
                letter-spacing: 0.05em;
            }
            .admin-table .client-info {
                align-items: flex-end;
            }
            .admin-table .notes-input {
                text-align: left;
                width: 100%;
                margin-top: 0.5rem;
            }
            .admin-table td[data-label="Nota Interna"] {
                flex-direction: column;
                align-items: flex-start;
            }
            .admin-table td[data-label="Nota Interna"]::before {
                margin-bottom: 0.5rem;
            }
        }

        .admin-table th {
            text-align: left;
            padding: 1.25rem 1rem;
            color: var(--color-text-muted);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
            white-space: nowrap;
        }
        .admin-table td {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--color-text);
            font-size: 0.95rem;
            vertical-align: middle;
        }
        .admin-table tr:last-child td {
            border-bottom: none;
        }
        .admin-table tr:hover td {
            background: rgba(255, 255, 255, 0.03);
        }
        .client-info {
             display: flex;
             flex-direction: column;
             gap: 0.25rem;
        }
        .client-sub {
            font-size: 0.8rem;
            color: var(--color-text-muted);
        }
        .service-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 99px;
            font-size: 0.8rem;
            font-weight: 600;
            white-space: nowrap;
        }
        .notes-input {
            width: 100%;
            background: transparent;
            border: 1px solid transparent;
            padding: 0.6rem;
            border-radius: 8px;
            color: #e2e8f0;
            font-size: 0.85rem;
            line-height: 1.4;
            transition: all 0.2s;
            font-family: inherit;
            display: block;
            scrollbar-width: thin;
        }
        .notes-input:hover {
            background: rgba(255,255,255,0.05);
            border-color: rgba(255,255,255,0.1);
        }
        .notes-input:focus {
            background: rgba(15, 23, 42, 0.8);
            border-color: var(--color-primary);
            outline: none;
        }
        .notes-input::placeholder {
            color: rgba(148, 163, 184, 0.5);
            font-style: italic;
        }

        /* Search Input Styling */
        .search-container {
            position: relative;
            display: flex;
            align-items: center;
        }
        .search-icon {
            position: absolute;
            left: 1rem;
            color: var(--color-text-muted);
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .search-input {
            width: 100%;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.8rem 1rem 0.8rem 3rem;
            color: white;
            font-family: 'Outfit', sans-serif;
            transition: all 0.2s;
        }
        .search-input:focus {
            outline: none;
            border-color: var(--color-primary);
            background: rgba(15, 23, 42, 0.8);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .search-input::placeholder {
            color: var(--color-text-muted);
            opacity: 0.6;
        }

        /* Switch Styles */
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255,0.1);
            transition: .4s;
            border-radius: 34px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 4px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input:checked + .slider {
            background-color: #10b981;
            border-color: #10b981;
        }
        input:checked + .slider:before {
            transform: translateX(24px);
            content: "✓";
            color: #10b981;
            font-weight: bold;
        }

        /* Segmented Control Styling */
        .status-segment-control {
            display: flex;
            background: rgba(15, 23, 42, 0.8);
            padding: 4px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            gap: 2px;
        }
        .segment-btn {
            padding: 0.6rem 1.25rem;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--color-text-muted);
            border-radius: 8px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            background: transparent;
            white-space: nowrap;
        }
        .segment-btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.03);
        }
        .segment-btn.active {
            color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .segment-btn.active.pending {
            background: var(--color-primary);
        }
        .segment-btn.active.completed {
            background: #10b981;
        }
        .segment-btn.active.all {
            background: #475569;
        }

        .status-badge-count {
            display: flex;
            align-items: center;
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
            font-family: 'Outfit', sans-serif;
        }
        .status-badge-count .count-label {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            color: var(--color-text-muted);
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.03em;
            background: rgba(255, 255, 255, 0.02);
        }
        .status-badge-count .count-value {
            padding: 0.5rem 1rem;
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--color-primary);
            background: rgba(59, 130, 246, 0.1);
            min-width: 40px;
            text-align: center;
        }
    `;

    // Login View (Igual que antes)
    if (!isLoggedIn) {
        return (
            <div
                className="container mx-auto flex items-center justify-center"
                style={{
                    minHeight: '80vh',
                    paddingTop: '80px',
                    paddingLeft: '1rem',
                    paddingRight: '1rem'
                }}
            >
                <Card
                    className="p-8 relative overflow-hidden backdrop-blur-xl bg-slate-900/60 border border-white/10 shadow-2xl"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        margin: '0 auto'
                    }}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none" />

                    <h2 className="text-3xl font-bold text-white mb-2 text-center relative z-10">Acceso Admin</h2>
                    <p className="text-muted text-center mb-8 text-sm relative z-10">Ingresa tus credenciales para gestionar reservas</p>

                    <form onSubmit={handleLogin} className="relative z-10" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '1rem',
                                    padding: '0.75rem 1rem'
                                }}
                                placeholder="ej. admin"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '1rem',
                                    padding: '0.75rem 1rem'
                                }}
                                placeholder="••••••••"
                            />
                        </div>

                        {loginError && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-pulse">
                                {loginError}
                            </div>
                        )}

                        <div style={{ marginTop: '1rem' }}>
                            <Button type="submit" className="w-full justify-center text-lg shadow-xl shadow-primary/20">
                                Entrar al Panel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }

    if (loading) return <div className="text-white text-center mt-32">Cargando base de datos...</div>;
    if (error) return <div className="text-red-400 text-center mt-32">Error de conexión: {error}</div>;

    return (
        <div className="container mx-auto pt-32 pb-20 px-4">
            <style>{styles}</style>

            <div className="flex flex-col mb-10 gap-6">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white">Panel de Administración</h1>
                        <p className="text-muted text-xs md:text-sm mt-1">Vista tabular de reservas</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                    <div className="status-segment-control w-full md:w-auto">
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className={`segment-btn flex-1 md:flex-none ${filterStatus === 'pending' ? 'active pending' : ''}`}
                        >
                            Pendientes
                        </button>
                        <button
                            onClick={() => setFilterStatus('completed')}
                            className={`segment-btn flex-1 md:flex-none ${filterStatus === 'completed' ? 'active completed' : ''}`}
                        >
                            Completados
                        </button>
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`segment-btn flex-1 md:flex-none ${filterStatus === 'all' ? 'active all' : ''}`}
                        >
                            Todos
                        </button>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 w-full md:w-auto">
                        <span className="status-badge-count flex-1 md:flex-none">
                            <span className="count-label">Mostrando</span>
                            <span className="count-value">{filteredBookings.length}</span>
                        </span>

                        <div className="hidden md:block h-4 w-[1px] bg-white/10" />

                        <Button
                            onClick={() => setIsLoggedIn(false)}
                            variant="ghost"
                            className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-red-400 transition-all p-0 whitespace-nowrap"
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="search-container">
                    <div className="search-icon">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por cliente, email o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="status-segment-control">
                    {[
                        { id: 'all', label: 'Todos' },
                        { id: 'tuneup', label: 'Tune-Up' },
                        { id: 'flatfix', label: 'Pinchazo' },
                        { id: 'repair', label: 'Reparación' },
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setFilterService(type.id)}
                            className={`segment-btn ${filterService === type.id ? 'active all' : ''}`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-white/5">
                    <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="text-muted" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No se encontraron reservas</h3>
                    <p className="text-muted">Intenta ajustar tus filtros de búsqueda</p>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>ID</th>
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th style={{ minWidth: '140px' }}>Fecha</th>
                                <th style={{ minWidth: '180px' }}>Nota Interna</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td data-label="ID" className="text-muted font-mono">#{booking.id}</td>
                                    <td data-label="Cliente">
                                        <div className="client-info">
                                            <div className="font-bold text-white">{booking.clientName}</div>
                                            <span className="client-sub">{booking.clientPhone}</span>
                                            <span className="client-sub text-xs opacity-75">{booking.clientEmail}</span>
                                        </div>
                                    </td>
                                    <td data-label="Servicio">
                                        <div className="flex flex-col gap-2 md:items-start items-end">
                                            <span
                                                className="service-badge w-fit"
                                                style={{
                                                    backgroundColor: getServiceColor(booking.serviceId),
                                                    color: booking.serviceId === 'tuneup' ? '#60a5fa' :
                                                        booking.serviceId === 'flatfix' ? '#34d399' : '#fbbf24',
                                                    border: `1px solid ${getServiceColor(booking.serviceId).replace('0.2', '0.3')}`
                                                }}
                                            >
                                                {getServiceLabel(booking.serviceId)}
                                            </span>
                                            <div className="flex items-center gap-1 text-muted text-xs">
                                                <Bike size={12} />
                                                <span>{booking.bikeModel || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Fecha">
                                        <div className="client-info">
                                            <span className="font-medium text-white">
                                                {formatDate(booking.date)}
                                            </span>
                                            <span className="client-sub text-accent font-bold">{booking.time} Hs</span>
                                        </div>
                                    </td>
                                    <td data-label="Nota Interna">
                                        {/* Editable Note Cell - TextArea */}
                                        <div className="relative w-full">
                                            <textarea
                                                className="notes-input scrollbar-hide"
                                                placeholder="+ Agregar nota..."
                                                defaultValue={booking.adminNotes || ''}
                                                rows={2}
                                                style={{
                                                    resize: 'vertical',
                                                    minHeight: '40px',
                                                    background: booking.adminNotes ? 'rgba(255,255,255,0.03)' : 'transparent',
                                                    fieldSizing: 'content'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(15, 23, 42, 0.9)';
                                                    e.target.style.borderColor = 'var(--color-primary)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = e.target.value ? 'rgba(255,255,255,0.03)' : 'transparent';
                                                    e.target.style.borderColor = 'transparent';

                                                    const val = e.target.value.trim();
                                                    if (val !== (booking.adminNotes || '')) {
                                                        handleUpdateNote(booking.id, val);
                                                    }
                                                }}
                                            />
                                            {savingNoteId === booking.id && (
                                                <div className="absolute right-2 top-2 text-accent pointer-events-none z-50">
                                                    <CheckCircle size={14} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td data-label="Estado" style={{ textAlign: 'center' }}>
                                        <div className="flex flex-col items-center gap-1">
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={!!booking.completed}
                                                    onChange={() => handleToggleStatus(booking.id, !!booking.completed)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold',
                                                color: booking.completed ? '#10b981' : 'var(--color-text-muted)',
                                                marginTop: '4px'
                                            }}>
                                                {booking.completed ? 'Terminado' : 'Pendiente'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;
