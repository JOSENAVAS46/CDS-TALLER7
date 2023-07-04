import { useState } from 'react';
import axios from 'axios';

const Compras = () => {
  const [codigoProveedor, setCodigoProveedor] = useState('');
  const [proveedor, setProveedor] = useState([]);
  const [lstProductos, setLstProductos] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [precioTotal, setPrecioTotal] = useState('');

  const buscarProveedor = async () => {
    if (codigoProveedor.trim() === '') {
      alert('Ingrese un código de proveedor válido');
      return;
    }
    try {
      const response = await axios.get(`/api/proveedores/${codigoProveedor}`);
      const proveedorResp = response.data;
      if (proveedorResp.length > 0) {
        setProveedor(proveedorResp);
      } else {
        setProveedor([]); // Limpiar el proveedor si no se encontró ninguno
        alert('No se encontró ningún proveedor con ese código');
      }
    } catch (error) {
      console.log('Error al buscar el proveedor:', error);
    }
  };


  const buscarProducto = async () => {
    try {
      const response = await axios.get(`/api/productos/${idProducto}`);
      const productosResp = response.data;
      if (productosResp) {
        setLstProductos(productosResp);
      } else {
        setLstProductos([]); // Vaciar el arreglo de productos
        alert('No se encontró ningún producto con ese ID');
      }
      // Actualizar los datos del producto en los estados correspondientes
    } catch (error) {
      console.log('Error al buscar el Producto:', error);
    }
  };

  const agregarItem = () => {
    const productoEncontrado = lstProductos.find(prod => prod.id === parseInt(idProducto));
    if (productoEncontrado) {
      const cantidad = parseInt(cantidadProducto);
      if (isNaN(cantidad) || cantidad <= 0) {
        alert('Ingrese una cantidad válida');
        return;
      }

      const existingItem = detalleFactura.find(item => item.producto.id === productoEncontrado.id);
      if (existingItem) {
        const updatedDetalleFactura = detalleFactura.map(item => {
          if (item.producto.id === productoEncontrado.id) {
            return { ...item, cantidad: item.cantidad + cantidad };
          }
          return item;
        });
        setDetalleFactura(updatedDetalleFactura);
      } else {
        const newItem = {
          producto: productoEncontrado,
          cantidad: cantidad,
          precioUnitario: productoEncontrado.precio_venta,
        };
        setDetalleFactura([...detalleFactura, newItem]);
      }

      setIdProducto('');
      setCantidadProducto('');
    }
  };

  const eliminarItem = (index) => {
    const updatedDetalleFactura = [...detalleFactura];
    updatedDetalleFactura.splice(index, 1);
    setDetalleFactura(updatedDetalleFactura);
  };

  const agregarCompra = async (e) => {
    e.preventDefault();
    if (detalleFactura.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }
    try {
      const response = await axios.post('/api/compras', {
        proveedor: proveedor,
        detalleFactura: detalleFactura,
      });
      alert(response.data.message);
      setCodigoProveedor('');
      setProveedor({});
      setDetalleFactura([]);
    } catch (error) {
      console.log('Error al agregar la compra:', error);
    }
  };

  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Compra</h2>
        <form onSubmit={agregarCompra}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="codigoProveedor">
              Codigo:
              <input
                type="text"
                placeholder="Codigo del Proveedor"
                value={codigoProveedor}
                onChange={(e) => setCodigoProveedor(e.target.value)}
                onBlur={buscarProveedor}
                required
              />
            </label>

            <label htmlFor="proveedor.nombre">
              Proveedor:
              <input
                type="text"
                placeholder="Nombre Proveedor"
                value={proveedor.length > 0 ? proveedor[0].nombre : ''}
                disabled
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
              />
            </label>
            <button type="button" onClick={buscarProducto}>Buscar Producto</button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                </tr>
              </thead>
              <tbody>
                {lstProductos.length === 0 ? (
                  <tr>
                    <td style={{ textAlign: 'center' }} colSpan={2}>No se encontró ningún producto con esa ID</td>
                    <td><a href="/producto"><button type="button">Añadir Producto</button></a></td>
                  </tr>
                ) : (
                  lstProductos.map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre + " | " + prod.marca + " | " + prod.peso}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="cantidad">Cantidad:
              <input
                type="text"
                placeholder="Cantidad del Producto"
                value={cantidadProducto}
                onChange={(e) => setCantidadProducto(e.target.value)}
              />
            </label>
            <button onClick={agregarItem} type="button">Añadir</button>
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
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {detalleFactura.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto.nombre}</td>
                  <td>{item.producto.categoria}</td>
                  <td>{item.producto.peso}</td>
                  <td>{item.producto.precio_compra}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.producto.stock}</td>
                  <td><button type="button" onClick={() => eliminarItem(index)}>Eliminar</button></td>
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
