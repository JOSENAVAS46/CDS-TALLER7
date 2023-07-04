import { useState } from 'react';
import axios from 'axios';

const RegistroCliente = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');

    const validarCampos = () => {
        return cedula.trim() !== '' &&
            nombre.trim() !== '' &&
            direccion.trim() !== '' &&
            telefono.trim() !== '' &&
            correoElectronico.trim() !== '';
    };

    const handleRegistro = async () => {
        if (validarCampos()) {
            try {
                const nuevoCliente = {
                    cedula: cedula,
                    nombre: nombre,
                    direccion: direccion,
                    telefono: telefono,
                    correoElectronico: correoElectronico
                };

                await axios.post('/api/clientes', nuevoCliente);
                // Restablecer los campos después del registro exitoso
                setCedula('');
                setNombre('');
                setDireccion('');
                setTelefono('');
                setCorreoElectronico('');

                alert('Cliente creado exitosamente');
            } catch (error) {
                console.error(error);
                alert('Error al crear el cliente');
            }
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    return (
        <main>
            <div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
                <form onSubmit={handleRegistro}>
                    <h2>Registro de Cliente</h2>

                    <label>
                        Cédula:
                        <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} maxLength={10} />
                    </label>
                    <br />
                    <label>
                        Nombre:
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Dirección:
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Teléfono:
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} maxLength={10} />
                    </label>
                    <br />
                    <label>
                        Correo Electrónico:
                        <input
                            type="text"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </main>
    );
};

export default RegistroCliente;
