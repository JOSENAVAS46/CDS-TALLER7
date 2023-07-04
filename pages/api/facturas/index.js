import db from '../../../config/db';

const crearFactura = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { idCliente, precioTotal } = req.body;
            // Insertar nueva factura en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_FacturaCRUD(?, ?, ?, ?, ?)';
            const values = ['C', null, idCliente, precioTotal, 'A'];

            const [result] = await db.query(sql, values);
            const idFactura = result[0][0].id;
            console.log('result:', result[0][0].id);
            res.status(201).json({ id: idFactura });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la factura' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default crearFactura;
