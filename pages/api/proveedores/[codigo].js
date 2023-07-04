import db from '../../../config/db';

const handler = async (req, res) => {
    const { codigo } = req.query;

    try {
        const [result] = await db.query('CALL sp_proveedorCRUD(?, ?, NULL, NULL, NULL, NULL)', ['R', codigo]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los valores de la base de datos' });
    }
};

export default handler;
