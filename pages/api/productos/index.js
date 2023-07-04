import db from '../../../config/db';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const [result] = await db.query('CALL sp_ProductoCRUD(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)', ['R']);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los valores de la base de datos' });
        }
    } else if (req.method === 'POST') {
        try {
            const { nombre, categoria, marca, peso, precio_compra, precio_venta, stock } = req.body;
            await db.query('CALL sp_ProductoCRUD(?, NULL, ?, ?, ?, ?, ?, ?, ?)', ['C', nombre, categoria, marca, peso, precio_compra, precio_venta, stock]);
            res.status(200).json({ message: 'Producto creado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    } else {
        res.status(400).json({ error: 'El método no existe' });
    }
};

export default handler;
