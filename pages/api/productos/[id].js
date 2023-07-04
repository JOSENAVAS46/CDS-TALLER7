import db from '../../../config/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const [result] = await db.query('CALL sp_ProductoCRUD(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)', ['R', id]);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el producto de la base de datos' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { stock } = req.body;

            // Actualizar el stock del producto en la base de datos utilizando el procedimiento almacenado
            const sql = 'CALL sp_ProductoCRUD(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = ['S', idProducto, null, null, null, null, null, stock, null];

            await db.query(sql, values);

            res.status(200).json({ message: 'Stock actualizado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el stock del producto' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
}
