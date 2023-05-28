import { useState, useEffect } from 'react';

export default function Categoria() {
  const [nombre, setNombre] = useState('');
  const [percha, setPercha] = useState('');
  const [lstCategorias, setLstCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('https://api.johnfdz.me/categoria');
      const data = await response.json();
      setLstCategorias(data);
    } catch (error) {
      console.log('Error al obtener las categorías:', error);
    }
  };

  const agregarCategoria = async (event) => {
    event.preventDefault();

    if (nombre.trim() !== '' && percha.trim() !== '') {
      // Validar que "percha" sea un número
      if (isNaN(percha)) {
        alert('El valor de "percha" debe ser un número válido');
        return;
      }

      const nuevaCategoria = {
        nombre: nombre,
        percha: parseInt(percha) // Convertir a número entero
      };

      try {
        const response = await fetch('https://api.johnfdz.me/categoria', {
          method: 'POST',
          body: JSON.stringify(nuevaCategoria)
        });

        if (response.ok) {
          obtenerCategorias();
        } else {
          console.log('Error al crear la categoría');
        }
      } catch (error) {
        console.log('Error al crear la categoría:', error);
      }

      // Limpiar los campos después de agregar la categoría
      setNombre('');
      setPercha('');
    }
  };

  return (
    <main>
      <div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <div style={{ flex: '1 1 50%', marginRight: '20px' }}>
          <h2>Registrar Categoría</h2>
          <form onSubmit={agregarCategoria} style={{ maxWidth: '400px' }}>
            <label htmlFor="nombre">Nombre:
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </label>
            <label htmlFor="percha">Percha:
              <input
                type="text"
                placeholder="Percha de la categoría"
                value={percha}
                onChange={(e) => setPercha(e.target.value)}
                required
              />
            </label>

            <button type="submit">Agregar</button>
          </form>
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <h3>Categorías existentes</h3>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Percha</th>
              </tr>
            </thead>
            <tbody>
              {lstCategorias.map((category, index) => (
                <tr key={index}>
                  <td>{category.nombre}</td>
                  <td>{category.percha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
