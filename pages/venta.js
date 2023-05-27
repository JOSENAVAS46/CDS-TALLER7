import { useState } from 'react';

const Ventas = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [Cliente, setCliente] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [lstProductos, setLstProductos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState('');

  function agregarVenta(event) {
    event.preventDefault();

    if (producto.trim() !== '' && cantidad.trim() !== '') {
      setProducto([...producto, { producto, cantidad }]);
      setProducto('');
      setCantidad('');
    }

  };

  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Venta</h2>
        <form onSubmit={agregarVenta}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="nombreCliente">Cliente:
              <input
                type="text"
                placeholder="Nombre & Apellido del Cliente"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
              />
            </label>
            <label htmlFor="cedulaCliente">Cedula:
              <input
                type="text"
                placeholder="Cedula del Cliente"
                value={cedulaCliente}
                onChange={(e) => setCedulaCliente(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="producto">Producto:
              <input
                type="text"
                placeholder="ID del Producto"
                value={idProducto}
                onChange={(e) => setIdProducto(e.target.value)}
                required
              />
            </label>
            <button type="button">Buscar</button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Producto</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>1</td>
                    <td>Arroz | Conejo | 1Lb</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="cantidad">Cantidad:
              <input
                type="text"
                placeholder="Cantidad del Producto"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </label>
            <button type="button">Añadir</button>
          </div>
          <h3>Productos</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoria</th>
                <th>Peso</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>

          <button type="submit">Vender</button>
        </form>

      </div>
    </main>
  );
};

export default Ventas;
