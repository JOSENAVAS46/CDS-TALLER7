import { useState } from 'react';


export default function Producto() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [peso, setPeso] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [producto, setProducto] = useState([]);
  const [lstProductos, setLstProductos] = useState([]);


  const agregarProducto = (event) => {
    event.preventDefault();

    if (nombre.trim() !== '' && categoria.trim() !== '' && marca.trim() !== '' && peso.trim() !== '' && precioCompra.trim() !== '' && precioVenta.trim() !== '') {
      setProducto([...producto, { nombre, categoria, marca, peso, precioCompra, precioVenta }]);
      setLstProductos([...lstProductos, producto]);
      setNombre('');
      setCategoria('');
      setMarca('');
      setPeso('');
      setPrecioCompra('');
      setPrecioVenta('');
    }
  };
  return (
    <main>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Gestión de Productos</h2>

        <h3>Nuevo Producto</h3>
        <form onSubmit={agregarProducto}>
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoria del Producto"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Marca del Producto"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Peso del Producto"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Precio de Compra del Producto"
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Precio de Venta del Producto"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>

        <h3>Productos existentes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Peso</th>
              <th>Precio de Compra</th>
              <th>Precio de Venta</th>
            </tr>
          </thead>
          <tbody>
            {producto.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.marca}</td>
                <td>{item.peso}</td>
                <td>{item.precioCompra}</td>
                <td>{item.precioVenta}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </main>
  );
}
