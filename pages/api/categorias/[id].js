import db from '../../../config/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const [result] = await db.query('CALL sp_CategoriaCRUD(?, ?, NULL, NULL)', ['R', id]);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la categoria de la base de datos' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
}
