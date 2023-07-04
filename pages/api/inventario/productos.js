import db from '../../../config/db';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const [result] = await db.query('CALL sp_ObtenerInventario(?)', ['P']);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el inventario de productos desde la base de datos' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default handler;
