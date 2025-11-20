import { pool } from '../../db_connecction.js';

// Obtener todos los Detalles_Compras
export const obtenerDetallesCompras = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Detalles_Compras');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};

// Obtener un detalle por ID
export const obtenerDetalleCompra = async (req, res) => {
  try {
    const { id_detalle_compra } = req.params;
    const [result] = await pool.query(
      'SELECT * FROM Detalles_Compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`
      });
    }

    res.json(result[0]);

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer el detalle de compra.',
      error: error
    });
  }
};

// Registrar nuevo detalle
export const registrarDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

    const [result] = await pool.query(
      'INSERT INTO Detalles_Compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_compra, id_producto, cantidad, precio_unitario]
    );

    res.status(201).json({ id_detalle_compra: result.insertId });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el detalle de compra.',
      error: error
    });
  }
};

// Eliminar por ID
export const eliminarDetalleCompra = async (req, res) => {
  try {
    const { id_detalle_compra } = req.params;

    const [result] = await pool.query(
      'DELETE FROM Detalles_Compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle.',
      error: error
    });
  }
};

// Actualizar Detalle Compra
export const actualizarDetalleCompraPatch = async (req, res) => {
  try {
    const { id_detalle_compra } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      'UPDATE Detalles_Compras SET ? WHERE id_detalle_compra = ?',
      [datos, id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Detalle de compra con ID ${id_detalle_compra} no encontrado.`
      });
    }

    res.status(200).json({
      mensaje: `Detalle de compra con ID ${id_detalle_compra} actualizado correctamente.`
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el detalle.',
      error: error
    });
  }
};

// Obtener detalles por ID de compra con JOIN
export const obtenerDetallesPorCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;

    const [result] = await pool.query(
      `SELECT d.id_detalle_compra,
              d.id_compra,
              d.id_producto,
              d.cantidad,
              d.precio_unitario,
              p.nombre_producto
       FROM Detalles_Compras d
       INNER JOIN Productos p ON d.id_producto = p.id_producto
       WHERE d.id_compra = ?`,
      [id_compra]
    );

    res.json(result);

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener detalles de la compra",
      error: error
    });
  }
};
