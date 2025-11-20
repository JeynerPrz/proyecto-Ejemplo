import { pool } from '../../db_connecction.js';
// Obtener todas las Detalles_Ventas
export const obtenerDetallesVentas = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Detalles_Ventas'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};

// Obtener un detalle_venta por su ID
export const obtenerDetalleVenta = async (req, res) => {
try {
const id_detalle_venta = req.params.id_detalle_venta;
const [result] = await pool.query('SELECT * FROM detalles_ventas WHERE id_detalle_venta = ?', [id_detalle_venta]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_detalle_venta} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los detalles_ventas.'
});
}
};


// Registrar un nuevo detalle_venta
export const registrarDetalleVenta = async (req, res) => {
  try {
    const {id_venta,
    id_producto,
    cantidad,
    precio_unitario} = req.body;

    const [result] = await pool.query(
      'INSERT INTO detalles_ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [id_venta,
    id_producto,
    cantidad,
    precio_unitario]
    );

    res.status(201).json({ id_detalle_venta: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el detalle_venta.',
      error: error
    });
  }
};


// ELIMINAR UN DETALLE_VENTA POR SU ID
export const eliminarDetalleVenta = async (req, res) => {
  try {
    const id_detalle_venta = req.params.id_detalle_venta;
    const [result] = await pool.query('DELETE FROM detalles_ventas WHERE id_detalle_venta = ?', [id_detalle_venta]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle_venta. El ID ${id_detalle_venta} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle_venta.',
      error: error
    });
  }
};


// Actualizar un detalle_venta por id 
export const actualizarDetalleVentaPatch = async (req, res) => {
  try {
    const {id_detalle_venta} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Detalles_Ventas SET ? WHERE id_detalle_venta = ?',
      [datos, id_detalle_venta ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Datelle_venta con . ID ${id_detalle_venta} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Detalle_venta con ID ${id_detalle_venta} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Detalle_venta.',
      error: error
    });
  }
};