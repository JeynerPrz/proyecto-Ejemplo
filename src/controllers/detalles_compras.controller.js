import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerDetalles_Compras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM detalles_compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};

export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_compra;
    const [result] = await pool.query("SELECT * FROM detalles_compras WHERE id_detalle_compra= ?",[id_detalle_compra]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};

export const registrarDetallesCompras = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Detalles_Compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)", 
      [id_compra, 
      id_producto, 
      cantidad, 
      precio_unitario
    ]);
    res.status(201).json({ id_detalle_compra: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};


export const eliminarDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const [result] = await pool.query(
      'DELETE FROM Detalles_Compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error
    });
  }
};

export const actualizarDetallesCompraPatch = async (req, res) => {
  try {
    const { id_detalle_compra } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Detalles_Compras SET ? WHERE id_detalle_compra = ?",
      [datos, id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Categoría con ID ${id_detalle_compra} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Categoría con ID ${id_detalle_compra} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría.",
      error,
    });
  }
};