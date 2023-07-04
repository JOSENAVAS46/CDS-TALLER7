import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Producto() {
  const [nombre, setNombre] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState(0);
  const [marca, setMarca] = useState('');
  const [peso, setPeso] = useState('');
  const [precioCompra, setPrecioCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [stock, setStock] = useState(0);
  const [lstProductos, setLstProductos] = useState([]);
  const [lstCategorias, setLstCategorias] = useState([]);

  const validarDecimal = (valor) => {
    const regex = /^\d*\.?\d{0,2}$/; // Expresión regular para validar decimales con máximo dos dígitos después del punto
    return regex.test(valor);
  };


  const formatearDecimal = (valor) => {
    const valorFormateado = valor.replace(',', '.');
    return valorFormateado;
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('/api/categorias');
      const data = await response.json();
      setLstCategorias(data);
    } catch (error) {
      console.log('Error al obtener las categorías:', error);
    }
  };

  const handleCategoriaChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = lstCategorias[selectedIndex - 1];
    setSelectedCategoria(selectedOption.id);
  };

  const handlePrecioCompraChange = (event) => {
    const valor = event.target.value;
    if (valor === '' || validarDecimal(valor)) {
      setPrecioCompra(valor);
    }
  };

  const handlePrecioVentaChange = (event) => {
    const valor = event.target.value;
    if (valor === '' || validarDecimal(valor)) {
      setPrecioVenta(valor);
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await fetch('/api/productos');
      const data = await response.json();
      setLstProductos(data);
    } catch (error) {
      console.log('Error al obtener las categorías:', error);
    }
  }

  const agregarProducto = async () => {
    if (
      nombre.trim() !== '' &&
      marca.trim() !== '' &&
      peso.trim() !== '' &&
      precioCompra !== 0 &&
      precioVenta !== 0 &&
      stock !== 0
    ) {
      // Validar que los campos de precio compra y precio venta contengan decimales válidos
      if (!validarDecimal(precioCompra) || !validarDecimal(precioVenta)) {
        alert('Los campos de precio deben ser decimales válidos (uso de punto(.) y máximo dos dígitos después del punto)');
      }

      // Formatear los campos de precio compra y precio venta
      const precioCompraFormateado = parseFloat(formatearDecimal(precioCompra));
      const precioVentaFormateado = parseFloat(formatearDecimal(precioVenta));

      const nuevoProducto = {
        nombre: nombre,
        categoria: parseInt(selectedCategoria),
        marca: marca,
        peso: peso,
        precio_compra: precioCompraFormateado,
        precio_venta: precioVentaFormateado,
        stock: stock
      };
      try {
        const response = await axios.post('/api/productos', nuevoProducto);
        console.log(response.data);
        obtenerProductos();
      } catch (error) {
        console.error(error);
      }
      setNombre('');
      setSelectedCategoria(0);
      setMarca('');
      setPeso('');
      setPrecioCompra('');
      setPrecioVenta('');
      setStock(0);
    } else {
      alert('Todos los campos son requeridos');
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
                  value={selectedCategoria}
                  onChange={handleCategoriaChange}
                  required
                >
                  <option value="Seleccionar categoría">Seleccionar categoría</option>
                  {lstCategorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id + ")" + cat.nombre}
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
                onChange={handlePrecioCompraChange}
                required
              />
            </label>
            <label htmlFor="precioVenta">Precio de Venta:
              <input
                type="text"
                placeholder="Precio de Venta del Producto"
                value={precioVenta}
                onChange={handlePrecioVentaChange}
                required
              />
            </label>
            <label htmlFor="stock">Stock:
              <input
                type="text"
                placeholder="Stock del Producto"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {lstProductos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.categoria}</td>
                  <td>{item.marca}</td>
                  <td>{item.peso}</td>
                  <td>{item.precio_compra}</td>
                  <td>{item.precio_venta}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>

  );
}
