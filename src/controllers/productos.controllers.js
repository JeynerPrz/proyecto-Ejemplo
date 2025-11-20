import { pool } from '../../db_connecction.js';
// Obtener todas las Productos
export const obtenerProductos = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Productos'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};


// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
try {
const id_producto = req.params.id_producto;
const [result] = await pool.query('SELECT * FROM productos  WHERE id_producto = ?', [id_producto]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_producto} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los productos.'
});
}
};


// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const {nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen} = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen]
    );
    res.status(201).json({id_producto: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error
    });
  }
};


// ELIMINAR UN PRODUCTO POR SU ID
export const eliminarProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id_producto]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la producto. El ID ${id_producto} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la producto.',
      error: error
    });
  }
};


// Actualizar un producto por id 
export const actualizarProductoPatch = async (req, res) => {
  try {
    const {id_producto} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Productos SET ? WHERE id_producto = ?',
      [datos,  id_producto ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Producto con . ID ${id_producto} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Producto con ID ${id_producto} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la empleado.',
      error: error
    });
  }
};