import { useState } from 'react';

const Producto = () => {
    const [producto, setProducto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [peso, setPeso] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
  
    const handleProductoChange = (event) => {
        setProducto(event.target.value);
        setCategoria(event.target.value);
        setMarca(event.target.value);
        setPeso(event.target.value);
        setPrecioCompra(event.target.value);
        setPrecioVenta(event.target.value);
    };
  
    // Manejar cambios para las otras propiedades del producto (categoria, marca, peso, precioCompra, precioVenta)
  
    const handleProductoSubmit = (event) => {
      event.preventDefault();
      // Lógica para guardar el producto en la base de datos o el estado de la aplicación
    };
  
    return (
      <main>
        <h2>Registro de productos</h2>
        <form onSubmit={handleProductoSubmit}>
          <label>
            Nombre del producto:
            <input type="text" value={producto} onChange={handleProductoChange} />
          </label>
          <label>
            Categoria:
            <input type="text" value={categoria} onChange={handleProductoChange} />
          </label>
          <label>
            Marca:
            <input type="text" value={marca} onChange={handleProductoChange} />
          </label>
          <label>
            Peso:
            <input type="text" value={peso} onChange={handleProductoChange} />
          </label>
          <label>
            Precio de compra:
            <input type="text" value={precioCompra} onChange={handleProductoChange} />
          </label>
          <label>
            Precio de venta:
            <input type="text" value={precioVenta} onChange={handleProductoChange} />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </main>
    );
  };
  
  export default Producto;