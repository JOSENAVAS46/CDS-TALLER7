import { useState, useEffect } from 'react';
import axios from 'axios';

const Ventas = () => {
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [cliente, setCliente] = useState([]);
  const [lstProductos, setLstProductos] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [precioTotal, setPrecioTotal] = useState('');

  const buscarCliente = async () => {
    if (cedulaCliente.trim() === '') {
      alert('Ingrese una cédula válida');
      return;
    }

    try {
      const response = await axios.get(`/api/clientes/${cedulaCliente}`);
      const clienteResp = response.data;
      if (clienteResp) {
        setCliente(clienteResp);
      } else {
        setCliente(null);
        alert('No se encontró ningún cliente con esa cédula');
      }
    } catch (error) {
      console.log('Error al buscar el cliente:', error);
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

      if (cantidad > productoEncontrado.stock) {
        alert('La cantidad ingresada supera el stock disponible');
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
          precioVenta: productoEncontrado.precio_venta,
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

  const calcularPrecioTotal = () => {
    const total = detalleFactura.reduce((acc, item) => {
      return acc + item.cantidad * item.precioVenta;
    }, 0);
    setPrecioTotal(total);
  };

  const agregarVenta = async (e) => {
    e.preventDefault();

    if (detalleFactura.length === 0) {
      alert('Agregue al menos un producto a la venta');
      return;
    }

    try {
      // Agregar la factura
    
      const facturaResponse = await fetch('/api/facturas', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idCliente: cliente[0].idCliente,
            precioTotal: precioTotal,
            idFactura: null // Esto es para el parámetro out del SP
          })        
      });

      const response = await facturaResponse.json();
      const facturaId = response.id;
      console.log('Factura ID:', facturaId);
      // Agregar los items de la factura
      await Promise.all(
        detalleFactura.map(async (item) => {
          const { producto, cantidad, precioVenta } = item;
          await axios.post('/api/detalle_factura', {
            idFactura: facturaId,
            idProducto: producto.id,
            cantidad: cantidad,
            precioVenta: precioVenta
          });

          // Restar la cantidad vendida del stock del producto
          
          await axios.put(`/api/productos/${producto.id}`, {
            idProducto: producto.id,
            stock: producto.stock - cantidad
          });
          
        })
      );

      alert('La venta se agregó exitosamente');
      limpiarFormulario();
    } catch (error) {
      console.log('Error al agregar la venta:', error);
      alert('Ocurrió un error al agregar la venta');
    }
  };

  const limpiarFormulario = () => {
    setCedulaCliente('');
    setCliente([]);
    setLstProductos([]);
    setIdProducto('');
    setCantidadProducto('');
    setDetalleFactura([]);
    setPrecioTotal('');
  };

  useEffect(() => {
  }, []);


  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Venta</h2>
        <form onSubmit={agregarVenta}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="producto">Cedula:
              <input
                type="text"
                placeholder="Cedula del Cliente"
                value={cedulaCliente}
                onChange={(e) => {
                  setCedulaCliente(e.target.value);
                }}
                onKeyUp={buscarCliente}
                maxLength={10}
                required
              />
            </label>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cliente.length === 0 ? (
                  <tr>
                    <td style={{ textAlign: 'center' }} colSpan={5}>No se encontró el cliente</td>
                    <td><a href="/cliente"><button type="button">Añadir Cliente</button></a></td>
                  </tr>
                ) : (
                  cliente.map((cli, index) => (
                    <tr key={index}>
                      <td>{cli.cedula}</td>
                      <td>{cli.nombre}</td>
                      <td>{cli.correoElectronico}</td>
                      <td>{cli.telefono}</td>
                      <td>{cli.direccion}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {detalleFactura.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto.nombre}</td>
                  <td>{item.producto.categoria}</td>
                  <td>{item.producto.peso}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.producto.precio_venta}</td>
                  <td><button type="button" onClick={() => eliminarItem(index)}>Eliminar</button></td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">Precio Total:</td>
                <td>{"$     " + precioTotal}</td>
                <td><button type="button" onClick={() => calcularPrecioTotal()}>Calcular</button></td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Vender</button>
        </form>

      </div >
    </main >
  );
};

export default Ventas;
