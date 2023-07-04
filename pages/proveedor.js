import { useState } from 'react';
import axios from 'axios';

const RegistroProveedor = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const validarCampos = () => {
        return (
            codigo.trim() !== '' &&
            nombre.trim() !== '' &&
            direccion.trim() !== '' &&
            telefono.trim() !== '' &&
            email.trim() !== ''
        );
    };

    const handleRegistro = async () => {
        if (validarCampos()) {
            try {
                const nuevoProveedor = {
                    codigo: codigo,
                    nombre: nombre,
                    direccion: direccion,
                    telefono: telefono,
                    email: email
                };

                await axios.post('/api/proveedores', nuevoProveedor);
                // Restablecer los campos después del registro exitoso
                setCodigo('');
                setNombre('');
                setDireccion('');
                setTelefono('');
                setEmail('');

                alert('Proveedor creado exitosamente');
            } catch (error) {
                console.error(error);
                alert('Error al crear el proveedor');
            }
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    return (
        <main>
            <div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
                <form onSubmit={handleRegistro}>
                    <h2>Registro de Proveedor</h2>

                    <label>
                        Código:
                        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} maxLength={10} />
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
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </main>
    );
};

export default RegistroProveedor;
