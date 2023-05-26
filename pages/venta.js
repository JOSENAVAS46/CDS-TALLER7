import { useState } from 'react';

const Ventas = () => {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleProductoChange = (event) => {
    setProducto(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleVentaSubmit = (event) => {
    event.preventDefault();
    // Lógica para registrar la venta y actualizar el stock
  };

  return (
    <main>
      <h2>Registro de ventas</h2>
      <form onSubmit={handleVentaSubmit}>
        <label>
          Producto:
          <input type="text" value={producto} onChange={handleProductoChange} />
        </label>
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={handleCantidadChange} />
        </label>
        <button type="submit">Registrar venta</button>
      </form>
    </main>
  );
};

export default Ventas;
