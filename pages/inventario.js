import React, { useState } from 'react';

const InventarioCategorias = () => {
  // Lógica para obtener el inventario por categorías desde la base de datos o el estado de la aplicación
  const inventarioCategorias = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Ejemplo de inventario por categorías

  return (
    <div>
      <h2>Listado de inventario por categorías</h2>
      <ul>
        {inventarioCategorias.map((categoria, index) => (
          <li key={index}>{categoria}</li>
        ))}
      </ul>
    </div>
  );
};

const InventarioProductos = () => {
  // Lógica para obtener el inventario por productos desde la base de datos o el estado de la aplicación
  const inventarioProductos = ['Producto 1', 'Producto 2', 'Producto 3']; // Ejemplo de inventario por productos

  return (
    <div>
      <h2>Listado de inventario por productos</h2>
      <ul>
        {inventarioProductos.map((producto, index) => (
          <li key={index}>{producto}</li>
        ))}
      </ul>
    </div>
  );
};

const InventarioAgotados = () => {
  // Lógica para obtener los productos agotados o próximos a agotar desde la base de datos o el estado de la aplicación
  const inventarioAgotados = ['Producto A', 'Producto B', 'Producto C']; // Ejemplo de productos agotados

  return (
    <div>
      <h2>Productos agotados o próximos a agotar</h2>
      <ul>
        {inventarioAgotados.map((producto, index) => (
          <li key={index}>{producto}</li>
        ))}
      </ul>
    </div>
  );
};

const ListadosInventario = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('categorias');

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
        {opcionSeleccionada === 'categorias' && <InventarioCategorias />}
        {opcionSeleccionada === 'productos' && <InventarioProductos />}
        {opcionSeleccionada === 'agotados' && <InventarioAgotados />}
      </div>
    </main>
  );
};

export default ListadosInventario;
