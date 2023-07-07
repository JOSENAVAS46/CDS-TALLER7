import db from '../../../config/db';

const agregarItemCompra = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { idCompra, idProducto, cantidad, precioCompra } = req.body;

            // Insertar nuevo detalle de compra en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_DetalleCompraCRUD(?, ?, ?, ?, ?, ?, ?)';
            const values = ['C', null, idCompra, idProducto, cantidad, precioCompra, 'A'];

            await db.query(sql, values);

            res.status(201).json({ message: 'Item de compra agregado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el item de compra' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default agregarItemCompra;
