import { pool } from '../../db_connecction.js';

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM categorias'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};

// Obtener una categoría por su ID
export const obtenerCategoria = async (req, res) => {
try {
const id_categoria = req.params.id_categoria;
const [result] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id_categoria]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_categoria} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de las categorias.'
});
}
};


// Registrar una nueva Categoría
export const registrarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)',
      [nombre_categoria, descripcion_categoria]
    );
    res.status(201).json({ id_categoria: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la categoría.',
      error: error
    });
  }
};



// ELIMINAR UNA CATEGORIA POR SU ID
export const eliminarCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;
    const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id_categoria]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${id_categoria} no fue encontrado.`
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


// Actualizar una Categoria por id 
export const actualizarCategoriaPatch = async (req, res) => {
  try {
    const {id_categoria} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Categorias SET ? WHERE id_categoria = ?',
      [datos,  id_categoria ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Categoria con . ID ${id_categoria} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Categoria con ID ${id_categoria} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Categoria.',
      error: error
    });
  }
};