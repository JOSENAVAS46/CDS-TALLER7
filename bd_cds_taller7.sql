-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2023 a las 04:32:35
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_cds_taller7`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CategoriaCRUD` (IN `p_Accion` CHAR(1), IN `p_Id` INT, IN `p_Nombre` VARCHAR(255), IN `p_Percha` INT)   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nueva categoría
    INSERT INTO categoria (nombre, percha, estado)
    VALUES (p_Nombre, p_Percha, 'A'); -- Estado inicial 'A' (activo)
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer categorías existentes
    IF (p_Id IS NOT NULL) THEN
      SELECT * FROM categoria WHERE id = p_Id;
    ELSE
      SELECT * FROM categoria;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar categoría
    UPDATE categoria
    SET nombre = IFNULL(p_Nombre, nombre),
        percha = IFNULL(p_Percha, percha)
    WHERE id = p_Id;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar categoría
    UPDATE categoria
    SET estado = 'I'
    WHERE id = p_Id;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar categoría
    UPDATE categoria
    SET estado = 'A'
    WHERE id = p_Id;
  END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ClienteCRUD` (IN `p_Accion` CHAR(1), IN `p_IdCliente` INT, IN `p_Cedula` CHAR(10), IN `p_Nombre` VARCHAR(255), IN `p_Direccion` VARCHAR(255), IN `p_Telefono` VARCHAR(15), IN `p_CorreoElectronico` VARCHAR(255))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nuevo cliente
    INSERT INTO cliente (cedula, nombre, direccion, telefono, correoElectronico, estado)
    VALUES (p_Cedula, p_Nombre, p_Direccion, p_Telefono, p_CorreoElectronico, 'A'); -- Estado inicial 'A' (activo)
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer clientes existentes
    IF (p_IdCliente IS NOT NULL) THEN
      SELECT * FROM cliente WHERE idCliente = p_IdCliente;
    ELSEIF (p_Cedula IS NOT NULL) THEN
      SELECT * FROM cliente WHERE cedula = p_Cedula;
    ELSE
      SELECT * FROM cliente;
    END IF;
  END IF;


  IF (p_Accion = 'U') THEN
    -- Actualizar cliente
    UPDATE cliente
    SET nombre = IFNULL(p_Nombre, nombre),
        direccion = IFNULL(p_Direccion, direccion),
        telefono = IFNULL(p_Telefono, telefono),
        correoElectronico = IFNULL(p_CorreoElectronico, correoElectronico)
    WHERE idCliente = p_IdCliente;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar cliente
    UPDATE cliente
    SET estado = 'I'
    WHERE idCliente = p_IdCliente;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar cliente
    UPDATE cliente
    SET estado = 'A'
    WHERE idCliente = p_IdCliente;
  END IF;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CompraCRUD` (IN `p_Accion` CHAR(1), IN `p_IdCompra` INT, IN `p_IdProveedor` INT, IN `p_PrecioTotal` DECIMAL(10,2), IN `p_Estado` CHAR(1))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nueva compra
    INSERT INTO compra (idProveedor, precioTotal, estado)
    VALUES (p_IdProveedor, p_PrecioTotal, IFNULL(p_Estado, 'A'));
    -- Obtener el ID de la compra recién creada
    SELECT LAST_INSERT_ID() AS id;
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer compras existentes
    IF (p_IdCompra IS NOT NULL) THEN
      SELECT * FROM compra WHERE id = p_IdCompra;
    ELSEIF (p_IdProveedor IS NOT NULL) THEN
      SELECT * FROM compra WHERE idProveedor = p_IdProveedor;
    ELSE
      SELECT * FROM compra;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar compra
    UPDATE compra
    SET idProveedor = p_IdProveedor,
        precioTotal = p_PrecioTotal,
        estado = p_Estado
    WHERE id = p_IdCompra;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar compra
    UPDATE compra
    SET estado = 'I'
    WHERE id = p_IdCompra;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar compra
    UPDATE compra
    SET estado = 'A'
    WHERE id = p_IdCompra;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DetalleCompraCRUD` (IN `p_Accion` CHAR(1), IN `p_IdDetalle` INT, IN `p_IdCompra` INT, IN `p_IdProducto` INT, IN `p_Cantidad` INT, IN `p_PrecioCompra` DECIMAL(10,2), IN `p_Estado` CHAR(1))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nuevo detalle de compra
    INSERT INTO detalle_compra (idCompra, idProducto, cantidad, precioCompra, estado)
    VALUES (p_IdCompra, p_IdProducto, p_Cantidad, p_PrecioCompra, IFNULL(p_Estado, 'A'));
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer detalles de compra existentes
    IF (p_IdDetalle IS NOT NULL) THEN
      SELECT * FROM detalle_compra WHERE id = p_IdDetalle;
    ELSEIF (p_IdCompra IS NOT NULL) THEN
      SELECT * FROM detalle_compra WHERE idCompra = p_IdCompra;
    ELSE
      SELECT * FROM detalle_compra;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar detalle de compra
    UPDATE detalle_compra
    SET idCompra = p_IdCompra,
        idProducto = p_IdProducto,
        cantidad = p_Cantidad,
        precioCompra = p_PrecioCompra,
        estado = p_Estado
    WHERE id = p_IdDetalle;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Eliminar detalle de compra
    DELETE FROM detalle_compra WHERE id = p_IdDetalle;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DetalleFacturaCRUD` (IN `p_Accion` CHAR(1), IN `p_IdDetalle` INT, IN `p_IdFactura` INT, IN `p_IdProducto` INT, IN `p_Cantidad` INT, IN `p_PrecioVenta` DECIMAL(10,2), IN `p_Estado` CHAR(1))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nuevo detalle de factura
    INSERT INTO detalle_factura (idFactura, idProducto, cantidad, precioVenta, estado)
    VALUES (p_IdFactura, p_IdProducto, p_Cantidad, p_PrecioVenta, IFNULL(p_Estado, 'A'));
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer detalles de factura existentes
    IF (p_IdDetalle IS NOT NULL) THEN
      SELECT * FROM detalle_factura WHERE id = p_IdDetalle;
    ELSEIF (p_IdFactura IS NOT NULL) THEN
      SELECT * FROM detalle_factura WHERE idFactura = p_IdFactura;
    ELSE
      SELECT * FROM detalle_factura;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar detalle de factura
    UPDATE detalle_factura
    SET idFactura = p_IdFactura,
        idProducto = p_IdProducto,
        cantidad = p_Cantidad,
        precioVenta = p_PrecioVenta,
        estado = p_Estado
    WHERE id = p_IdDetalle;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Eliminar detalle de factura
    DELETE FROM detalle_factura WHERE id = p_IdDetalle;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_FacturaCRUD` (IN `p_Accion` CHAR(1), IN `p_IdFactura` INT, IN `p_IdCliente` INT, IN `p_PrecioTotal` DECIMAL(10,2), IN `p_Estado` CHAR(1))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nueva factura
    INSERT INTO factura (idCliente, precioTotal, estado)
    VALUES (p_IdCliente, p_PrecioTotal, IFNULL(p_Estado, 'A'));
    -- Obtener el ID de la factura recién creada
    SELECT LAST_INSERT_ID() AS id;
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer facturas existentes
    IF (p_IdFactura IS NOT NULL) THEN
      SELECT * FROM factura WHERE id = p_IdFactura;
    ELSEIF (p_IdCliente IS NOT NULL) THEN
      SELECT * FROM factura WHERE idCliente = p_IdCliente;
    ELSE
      SELECT * FROM factura;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar factura
    UPDATE factura
    SET idCliente = p_IdCliente,
        precioTotal = p_PrecioTotal,
        estado = p_Estado
    WHERE id = p_IdFactura;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar factura
    UPDATE factura
    SET estado = 'I'
    WHERE id = p_IdFactura;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar factura
    UPDATE factura
    SET estado = 'A'
    WHERE id = p_IdFactura;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ObtenerInventario` (IN `opcion` CHAR(1))   BEGIN
    IF opcion = 'C' THEN
        -- Obtener inventario por categorías
        SELECT
            C.nombre AS categoria,
            P.nombre AS producto,
            P.marca,
            P.peso,
            P.precio_venta,
            P.stock
        FROM
            Producto P
            INNER JOIN Categoria C ON P.categoria_id = C.id
        ORDER BY
            C.nombre, P.nombre;
    ELSEIF opcion = 'A' THEN
        -- Obtener productos agotados o próximos a agotar
        SELECT
            P.nombre AS producto,
            P.marca,
            P.peso,
            P.precio_venta,
            P.stock
        FROM
            Producto P
        WHERE
            P.stock <= 5; -- Puedes ajustar este valor según tus necesidades
    ELSEIF opcion = 'P' THEN
        -- Obtener inventario de productos en general
        SELECT
            P.nombre AS producto,
            P.marca,
            P.peso,
            P.precio_venta,
            P.stock
        FROM
            Producto P;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ProductoCRUD` (IN `p_Accion` CHAR(1), IN `p_Id` INT, IN `p_Nombre` VARCHAR(100), IN `p_CategoriaId` INT, IN `p_Marca` VARCHAR(100), IN `p_Peso` DECIMAL(10,2), IN `p_PrecioCompra` DECIMAL(10,2), IN `p_PrecioVenta` DECIMAL(10,2), IN `p_Stock` INT)   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nuevo producto
    INSERT INTO producto (nombre, categoria_id, marca, peso, precio_compra, precio_venta, estado, stock)
    VALUES (p_Nombre, p_CategoriaId, p_Marca, p_Peso, p_PrecioCompra, p_PrecioVenta, 'A', p_Stock); -- Estado inicial 'A' (activo)
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer productos existentes
    IF (p_Id IS NOT NULL) THEN
      SELECT p.id, p.nombre, c.nombre AS categoria, p.marca, p.peso, p.precio_compra, p.precio_venta, p.estado, p.stock
      FROM producto AS p
      INNER JOIN categoria AS c ON p.categoria_id = c.id
      WHERE p.id = p_Id;
    ELSE
      SELECT p.id, p.nombre, c.nombre AS categoria, p.marca, p.peso, p.precio_compra, p.precio_venta, p.estado, p.stock
      FROM producto AS p
      INNER JOIN categoria AS c ON p.categoria_id = c.id;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar producto
    UPDATE producto
    SET nombre = IFNULL(p_Nombre, nombre),
        categoria_id = IFNULL(p_CategoriaId, categoria_id),
        marca = IFNULL(p_Marca, marca),
        peso = IFNULL(p_Peso, peso),
        precio_compra = IFNULL(p_PrecioCompra, precio_compra),
        precio_venta = IFNULL(p_PrecioVenta, precio_venta),
        stock = IFNULL(p_Stock, stock)
    WHERE id = p_Id;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar producto
    UPDATE producto
    SET estado = 'I'
    WHERE id = p_Id;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar producto
    UPDATE producto
    SET estado = 'A'
    WHERE id = p_Id;
  END IF;
  
  IF (p_Accion = 'S') THEN
    -- Actualizar stock
    UPDATE producto
    SET stock = p_Stock
    WHERE id = p_Id;
  END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ProveedorCRUD` (IN `p_Accion` CHAR(1), IN `p_Codigo` VARCHAR(20), IN `p_Nombre` VARCHAR(50), IN `p_Direccion` VARCHAR(100), IN `p_Telefono` VARCHAR(20), IN `p_Email` VARCHAR(50))   BEGIN
  IF (p_Accion = 'C') THEN
    -- Crear nuevo proveedor
    INSERT INTO proveedor (codigo, nombre, direccion, telefono, email, estado)
    VALUES (p_Codigo, p_Nombre, p_Direccion, p_Telefono, p_Email, 'A'); -- Estado inicial 'A' (activo)
  END IF;

  IF (p_Accion = 'R') THEN
    -- Leer proveedores existentes
    IF (p_Codigo IS NOT NULL) THEN
      SELECT * FROM proveedor WHERE codigo = p_Codigo;
    ELSE
      SELECT * FROM proveedor;
    END IF;
  END IF;

  IF (p_Accion = 'U') THEN
    -- Actualizar proveedor
    UPDATE proveedor
    SET nombre = IFNULL(p_Nombre, nombre),
        direccion = IFNULL(p_Direccion, direccion),
        telefono = IFNULL(p_Telefono, telefono),
        email = IFNULL(p_Email, email)
    WHERE codigo = p_Codigo;
  END IF;

  IF (p_Accion = 'D') THEN
    -- Desactivar proveedor
    UPDATE proveedor
    SET estado = 'I'
    WHERE codigo = p_Codigo;
  END IF;

  IF (p_Accion = 'A') THEN
    -- Activar proveedor
    UPDATE proveedor
    SET estado = 'A'
    WHERE codigo = p_Codigo;
  END IF;
  
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `percha` int(11) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL CHECK (`estado` in ('I','A'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `percha`, `estado`) VALUES
(1, 'Lacteos', 1, 'A'),
(2, 'Granos', 2, 'A'),
(3, 'Energizante', 3, 'A'),
(4, 'Snacks', 10, 'A'),
(5, 'Cereales', 5, 'A'),
(6, 'Dulces', 23, 'A'),
(7, 'Pasta', 11, 'A'),
(8, 'Verduras', 7, 'A'),
(9, 'Hidratantes', 22, 'A'),
(10, 'Frutas', 35, 'A'),
(11, 'Embutidos', 4, 'A'),
(12, 'Carnicos', 4, 'A'),
(13, 'Enlatados', 2, 'A'),
(14, 'Higiene', 12, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `cedula`, `nombre`, `direccion`, `telefono`, `correoElectronico`, `estado`) VALUES
(1, '0999999999', 'Consumidor Final', 'Direccion', '0999999999', 'consumidor.final@gmail.com', 'A'),
(2, '0924004914', 'Jose Navas', 'Guasmo Sur', '0963002366', 'jose.navasordonez@gmail.com', 'A'),
(3, '0943657320', 'John Fernandez', 'Bastion Popular', '0962612365', 'jhon.fernandezv@ug.edu.ec', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  `estado` char(1) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id`, `idProveedor`, `precioTotal`, `estado`) VALUES
(1, 3, '12.70', 'A'),
(2, 4, '2.40', 'A'),
(3, 1, '401.00', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id` int(11) NOT NULL,
  `idCompra` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precioCompra` decimal(10,2) DEFAULT NULL,
  `estado` char(1) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`id`, `idCompra`, `idProducto`, `cantidad`, `precioCompra`, `estado`) VALUES
(1, 1, 4, 7, '0.60', 'A'),
(2, 1, 5, 5, '1.70', 'A'),
(3, 2, 4, 4, '0.60', 'A'),
(4, 3, 10, 4, '100.25', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `id` int(11) NOT NULL,
  `idFactura` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precioVenta` decimal(10,2) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_factura`
--

INSERT INTO `detalle_factura` (`id`, `idFactura`, `idProducto`, `cantidad`, `precioVenta`, `estado`) VALUES
(2, 6, 1, 5, '34.00', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id`, `idCliente`, `precioTotal`, `estado`) VALUES
(6, 2, '170.00', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `peso` varchar(50) DEFAULT NULL,
  `precio_compra` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `categoria_id`, `marca`, `peso`, `precio_compra`, `precio_venta`, `stock`, `estado`) VALUES
(1, 'Arroz', 2, 'Conejo', '1 q', '20.00', '34.00', 5, 'A'),
(2, 'Leche', 1, 'Nutri', '1 lt', '0.50', '1.00', 20, 'A'),
(3, 'Yogurt', 1, 'Toni', '1.2 lt', '0.75', '2.00', 15, 'A'),
(4, 'Galletas', 4, 'Oreo', '500 gr', '0.60', '1.00', 26, 'A'),
(5, 'Galletas', 4, 'Ducales', '1500 gr', '1.70', '3.50', 25, 'A'),
(6, 'Frijoles Mantequilla', 2, 'Patito', '1 lb', '0.12', '0.50', 23, 'A'),
(7, 'Lenteja', 2, 'Patito', '1 lb', '0.30', '0.70', 10, 'A'),
(8, 'Salchichas', 11, 'Plumrose', '500 gr', '0.50', '1.20', 0, 'A'),
(9, 'Hamburguesas', 12, 'Piggi', '500 gr', '0.90', '1.75', 11, 'A'),
(10, 'Pasta Dental', 15, 'Colgate', '100.00', '0.50', '1.00', 100, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `codigo`, `nombre`, `direccion`, `telefono`, `email`, `estado`) VALUES
(1, 'P001', 'Coca-Cola', 'Calle Principal 123', '1234567890', 'coca_cola@example.com', 'A'),
(2, 'P002', 'Frito Lay', 'Avenida Central 456', '9876543210', 'frito_lay@example.com', 'A'),
(3, 'P003', 'Ole', 'Plaza Mayor 789', '5555555555', 'ole@example.com', 'A'),
(4, 'P004', 'Maggi', 'Direccion de Maggi', '1234567899', 'maggi@example.com', 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProveedor` (`idProveedor`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompra` (`idCompra`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFactura` (`idFactura`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`id`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`),
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD CONSTRAINT `detalle_factura_ibfk_1` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`id`),
  ADD CONSTRAINT `detalle_factura_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
