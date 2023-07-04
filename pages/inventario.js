import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventario = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('categorias');
  const [inventarioOriginal, setInventarioOriginal] = useState([]);
  const [inventarioFiltrado, setInventarioFiltrado] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
    obtenerInventario();
  }, [opcionSeleccionada]);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerInventario = async () => {
    try {
      const response = await axios.get(`/api/inventario/${opcionSeleccionada}`);
      setInventarioOriginal(response.data);
      setInventarioFiltrado(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const obtenerInventarioPorCategoria = (categoria) => {
    if (categoria === '') {
      setInventarioFiltrado(inventarioOriginal);
    } else {
      const inventarioFiltrado = inventarioOriginal.filter((item) => item.categoria === categoria);
      setInventarioFiltrado(inventarioFiltrado);
    }
  };

  const handleOpcionSeleccionada = (event) => {
    setOpcionSeleccionada(event.target.value);
  };

  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Inventario por:</h2>
        <select id="opciones" value={opcionSeleccionada} onChange={handleOpcionSeleccionada}>
          <option value="categorias">Categorías</option>
          <option value="productos">Productos</option>
          <option value="agotados">Agotados</option>
        </select>

        {opcionSeleccionada === 'categorias' && (
          <div>
            <h2>Listado de inventario por categorías</h2>
            <select onChange={(e) => obtenerInventarioPorCategoria(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            <table>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Peso</th>
                  <th>Precio Venta</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {inventarioFiltrado.map((item, index) => (
                  <tr key={index}>
                    <td>{item.categoria}</td>
                    <td>{item.producto}</td>
                    <td>{item.marca}</td>
                    <td>{item.peso}</td>
                    <td>{item.precio_venta}</td>
                    <td>{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {opcionSeleccionada === 'productos' && (
          <div>
            <h2>Listado de inventario por productos</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Peso</th>
                  <th>Precio Venta</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {inventarioFiltrado.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.marca}</td>
                    <td>{item.peso}</td>
                    <td>{item.precio_venta}</td>
                    <td>{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {opcionSeleccionada === 'agotados' && (
          <div>
            <h2>Listado de productos agotados o próximos a agotar</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Peso</th>
                  <th>Precio Venta</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {inventarioFiltrado.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.marca}</td>
                    <td>{item.peso}</td>
                    <td>{item.precio_venta}</td>
                    <td>{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Inventario;
