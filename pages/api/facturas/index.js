import db from '../../../config/db';

const crearFactura = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { idCliente, precioTotal, estado = 'A' } = req.body;
            // Insertar nueva factura en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_FacturaCRUD(?, ?, ?, ?, ?, @p_IdFacturaNuevo)';
            const values = ['C', null, idCliente , precioTotal, estado];
            
            const [result] = await db.query(sql, values);

            const facturaId = result.insertId;

            res.status(201).json({ id: facturaId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la factura' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default crearFactura;
