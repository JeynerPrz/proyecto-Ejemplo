import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};

export const obtenerCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query("SELECT * FROM compras WHERE id_compra= ?",[id_compra]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_compra} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};

export const registrarCompra = async (req, res) => {
  try {
    const { id_empleado, fecha_compra, total_compra } = req.body;
    const [result] = await pool.query(
      "INSERT INTO compras (id_empleado, fecha_compra, total_compra) VALUES (?, ?, ?)", 
      [id_empleado, fecha_compra, total_compra]
    );
    res.status(201).json({ id_compra: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};

export const eliminarCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      'DELETE FROM compras WHERE id_compra = ?',
      [id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_compra} no fue encontrado.`
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

// Controlador para actualizar parcialmente una categoría por su ID
export const actualizarCompraPatch = async (req, res) => {
  try {
    const { id_compra } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE compras SET ? WHERE id_compra = ?",
      [datos, id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Categoría con ID ${id_compra} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Categoría con ID ${id_compra} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría.",
      error,
    });
  }
};