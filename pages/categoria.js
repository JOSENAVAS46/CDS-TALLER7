import { useState } from 'react';

export default function Categoria() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const agregarCategoria = (event) => {
    event.preventDefault();

    if (categoryName.trim() !== '') {
      setCategories([...categories, categoryName]);
      setCategoryName('');
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>

        <h3>Categorías existentes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre de la categoría</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
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
