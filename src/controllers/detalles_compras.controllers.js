import { pool } from '../../db_connecction.js';
// Obtener todos los Detalles_Compras 
export const obtenerDetallesCompras = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Detalles_Compras'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};


// Obtener un detalle_compra por su ID
export const obtenerDetalleCompra = async (req, res) => {
try {
const id_detalle_compra = req.params.id_detalle_compra;
const [result] = await pool.query('SELECT * FROM detalles_compras WHERE id_detalle_compra = ?', [id_detalle_compra]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los detalle_compra.'
});
}
};


// Registrar un nuevo detalle_compra
export const registrarDetalleCompra = async (req, res) => {
  try {
    const {id_compra,
    id_producto,
    cantidad,
    precio_unitario} = req.body;

    const [result] = await pool.query(
      'INSERT INTO detalles_compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [id_compra,
    id_producto,
    cantidad,
    precio_unitario]
    );

    res.status(201).json({ id_detalle_compra: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el detalle_compra.',
      error: error
    });
  }
};


// ELIMINAR UN DETALLE_COMPRA POR SU ID
export const eliminarDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const [result] = await pool.query('DELETE FROM detalles_compras WHERE id_detalle_compra = ?', [id_detalle_compra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle_compra. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle_compra.',
      error: error
    });
  }
};


// Actualizar un detalle_compra por id 
export const actualizarDetalleCompraPatch = async (req, res) => {
  try {
    const {id_detalle_compra} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Detalles_Compras SET ? WHERE id_detalle_compra = ?',
      [datos, id_detalle_compra ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Datelle_Compra con . ID ${id_detalle_compra} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Detalle_Compra con ID ${id_detalle_compra} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Detalle_Compra.',
      error: error
    });
  }
};