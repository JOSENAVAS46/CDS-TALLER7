import { useState, useEffect } from 'react';

export default function Producto() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [peso, setPeso] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [producto, setProducto] = useState([]);
  const [lstProductos, setLstProductos] = useState([]);
  const [lstCategorias, setLstCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('https://api.johnfdz.me/categoria');
      const data = await response.json();
      setLstCategorias(data);
    } catch (error) {
      console.log('Error al obtener las categorías:', error);
    }
  };

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
      <div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <div style={{ flex: '1 1 50%', marginRight: '40px' }}>
          <h2>Gestión de Productos</h2>

          <h3>Nuevo Producto</h3>
          <form onSubmit={agregarProducto}>
            <label htmlFor="nombre">Nombre:
              <input
                type="text"
                placeholder="Nombre del Producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="categoria">
                Categoría:
                <select
                  id="opciones"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {lstCategorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label htmlFor="marca">Marca:
              <input
                type="text"
                placeholder="Marca del Producto"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </label>
            <label htmlFor="peso">Peso:
              <input
                type="text"
                placeholder="Peso del Producto"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
              />
            </label>
            <label htmlFor="precioCompra">Precio de Compra:
              <input
                type="text"
                placeholder="Precio de Compra del Producto"
                value={precioCompra}
                onChange={(e) => setPrecioCompra(e.target.value)}
                required
              />
            </label>
            <label htmlFor="precioVenta">Precio de Venta:
              <input
                type="text"
                placeholder="Precio de Venta del Producto"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
                required
              />
            </label>

            <button type="submit">Agregar</button>
          </form>
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <h3>Productos existentes</h3>
          <table style={{ width: '550px' }}>
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
      </div>
    </main>

  );
}
