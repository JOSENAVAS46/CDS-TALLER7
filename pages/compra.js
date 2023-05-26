import { useState } from 'react';

const Compras = () => {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleProductoChange = (event) => {
    setProducto(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleCompraSubmit = (event) => {
    event.preventDefault();
    // Lógica para registrar la compra y actualizar el stock
  };

  return (
    <main>
      <h2>Registro de compras</h2>
      <form onSubmit={handleCompraSubmit}>
        <label>
          Producto:
          <input type="text" value={producto} onChange={handleProductoChange} />
        </label>
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={handleCantidadChange} />
        </label>
        <button type="submit">Registrar compra</button>
      </form>
    </main>
  );
};

export default Compras;
