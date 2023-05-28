import { useState } from 'react';

const Compras = () => {
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [codigoProveedor, setCodigoProveedor] = useState('');
  const [proveedor, setProveedor] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [lstProductosCant, setLstProductosCant] = useState([]);
  const [precioTotal, setPrecioTotal] = useState('');

  function agregarCompra(event) {
    event.preventDefault();

    if (idProducto.trim() !== '' && cantidad.trim() !== '') {
      setLstProductosCant([...lstProductos, { idProducto, cantidad }]);
      setIdProducto('');
      setCantidad('');
    }
  }

  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Compra</h2>
        <form onSubmit={agregarCompra}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="nombreProveedor">Proveedor:
              <input
                type="text"
                placeholder="Nombre & Apellido del Proveedor"
                value={nombreProveedor}
                onChange={(e) => setNombreProveedor(e.target.value)}
                required
              />
            </label>
            <label htmlFor="codigoProveedor">Codigo:
              <input
                type="text"
                placeholder="Codigo del Proveedor"
                value={codigoProveedor}
                onChange={(e) => setCodigoProveedor(e.target.value)}
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
                  <td>Producto 1</td>
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
              {lstProductosCant.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.idProducto}</td>
                  <td>Categoría del producto</td>
                  <td>Peso del producto</td>
                  <td>Precio del producto</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="submit">Comprar</button>
        </form>
      </div>
    </main>
  );
};

export default Compras;
