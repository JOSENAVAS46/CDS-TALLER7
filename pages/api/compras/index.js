import db from '../../../config/db';

const crearCompra = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { idProveedor, precioTotal } = req.body;

            // Insertar nueva compra en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_CompraCRUD(?, ?, ?, ?, ?)';
            const values = ['C', null, idProveedor, precioTotal, 'A'];

            const [result] = await db.query(sql, values);
            const idCompra = result[0][0].id;

            res.status(201).json({ id: idCompra });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la compra' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default crearCompra;
