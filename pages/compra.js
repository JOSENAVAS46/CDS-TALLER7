import { useState } from 'react';
import axios from 'axios';

const Compras = () => {
  const [proveedor, setProveedor] = useState([]);
  const [lstProductos, setLstProductos] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [detalleCompra, setDetalleCompra] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [codigoProveedor, setCodigoProveedor] = useState('');


  const buscarProveedor = async () => {
    if (codigoProveedor.trim() === '') {
      alert('Ingrese un código de proveedor válido');
      return;
    }
    try {
      const response = await axios.get(`/api/proveedores/${codigoProveedor}`);
      const proveedorResp = response.data;
      if (proveedorResp) {
        setProveedor(proveedorResp);
      } else {
        setProveedor(null); // Limpiar el proveedor si no se encontró ninguno
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

      const existingItemIndex = detalleCompra.findIndex(item => item.producto.id === productoEncontrado.id);
      if (existingItemIndex !== -1) {
        const updatedDetalleCompra = [...detalleCompra];
        updatedDetalleCompra[existingItemIndex].cantidad += cantidad;
        setDetalleCompra(updatedDetalleCompra);
      } else {
        const newItem = {
          producto: productoEncontrado,
          cantidad: cantidad,
          precioCompra: parseFloat(productoEncontrado.precio_compra),
        };
        setDetalleCompra([...detalleCompra, newItem]);
      }

      setIdProducto('');
      setCantidadProducto('');
    }
  };

  const eliminarItem = (index) => {
    const updatedDetalleCompra = [...detalleCompra];
    updatedDetalleCompra.splice(index, 1);
    setDetalleCompra(updatedDetalleCompra);
  };


  const calcularPrecioTotal = () => {
    const total = detalleCompra.reduce((acc, item) => {
      return acc + item.cantidad * item.precioCompra;
    }, 0);
    setPrecioTotal(total);
  };
  

  const agregarCompra = async (e) => {
    e.preventDefault();

    if (detalleCompra.length === 0) {
      alert('Agregue al menos un producto a la compra');
      return;
    }

    try {
      // Agregar la compra

      const compraResponse = await fetch('/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idProveedor: proveedor[0].id,
          precioTotal: precioTotal,
          idCompra: null // Esto es para el parámetro out del SP
        })
      });

      const response = await compraResponse.json();
      const compraId = response.id;

      // Agregar los items de la compra
      await Promise.all(
        detalleCompra.map(async (item) => {
          const { producto, cantidad, precioCompra } = item;
          await axios.post('/api/detalle_compra', {
            idCompra: compraId,
            idProducto: producto.id,
            cantidad: cantidad,
            precioCompra: precioCompra
          });

          // Incrementar la cantidad comprada en el stock del producto
          await axios.put(`/api/productos/${producto.id}`, {
            idProducto: producto.id,
            stock: producto.stock + cantidad
          });
        })
      );

      alert('La compra se agregó exitosamente');
      limpiarFormulario();
    } catch (error) {
      console.log('Error al agregar la compra:', error);
      alert('Ocurrió un error al agregar la compra');
    }
  };

  const limpiarFormulario = () => {
    setCodigoProveedor('');
    setProveedor([]);
    setLstProductos([]);
    setIdProducto('');
    setCantidadProducto('');
    setDetalleCompra([]);
    setPrecioTotal('');
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
                <th>Stock</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {detalleCompra.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto.nombre}</td>
                  <td>{item.producto.categoria}</td>
                  <td>{item.producto.peso}</td>
                  <td>{item.producto.stock}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.producto.precio_compra}</td>
                  <td><button type="button" onClick={() => eliminarItem(index)}>Eliminar</button></td>
                </tr>
              ))}
              <tr>
                <td colSpan="5">Precio Total:</td>
                <td>{"$     " + precioTotal}</td>
                <td><button type="button" onClick={() => calcularPrecioTotal()}>Calcular</button></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Comprar</button>
        </form>
      </div>
    </main>
  );
};

export default Compras;
