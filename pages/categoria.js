import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categoria() {
  const [nombre, setNombre] = useState('');
  const [percha, setPercha] = useState('');
  const [lstCategorias, setLstCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('/api/categorias');
      setLstCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const agregarCategoria = async () => {
    if (nombre.trim() !== '' && percha.trim() !== '') {
      // Validar que "percha" sea un número
      if (isNaN(percha)) {
        alert('El valor de "percha" debe ser un número válido');
        return;
      }

      try {
        const nuevaCategoria = {
          nombre: nombre,
          percha: parseInt(percha)
        };

        const response = await axios.post('/api/categorias', nuevaCategoria);
        console.log(response.data);
        obtenerCategorias();
      } catch (error) {
        console.error(error);
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
