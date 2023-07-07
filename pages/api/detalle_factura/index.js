import db from '../../../config/db';

const agregarItemVenta = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { idFactura, idProducto, cantidad , precioVenta} = req.body;
            console.log("ID PRODUCTO", idProducto);
            // Insertar nuevo detalle de factura en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_DetalleFacturaCRUD(?, ?, ?, ?, ?, ?, ?)';
            const values = ['C', null, idFactura, idProducto, cantidad, precioVenta, 'A'];

            await db.query(sql, values);

            res.status(201).json({ message: 'Item de venta agregado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el item de venta' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default agregarItemVenta;
