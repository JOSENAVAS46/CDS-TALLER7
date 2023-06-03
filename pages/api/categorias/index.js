import db from '../../../config/db';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const [result] = await db.query('CALL SP_CategoriaCRUD(?, NULL, NULL, NULL)', ['R']);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los valores de la base de datos' });
        }
    } else if (req.method === 'POST') {
        try {
            const { nombre, percha } = req.body;
            await db.query('CALL SP_CategoriaCRUD(?, NULL, ?, ?)', ['C', nombre, percha]);
            res.status(200).json({ message: 'Categoría creada exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }

}
export default handler;