import { useState } from 'react';

export default function Categoria() {
  const [nombre, setNombre] = useState('');
  const [lstCategorias, setLstCategorias] = useState([]);

  const agregarCategoria = (event) => {
    event.preventDefault();

    if (nombre.trim() !== '') {
      setLstCategorias([...lstCategorias, nombre]);
      setNombre('');
    }
  };

  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Gestión de Categorías</h2>

        <h3>Nueva Categoría</h3>
        <form onSubmit={agregarCategoria}>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>

        <h3>Categorías existentes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {lstCategorias.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
