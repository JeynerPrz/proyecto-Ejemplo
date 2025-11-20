import { pool } from '../../db_connecction.js';
// Obtener todas las Usuarios 
export const obtenerUsuarios = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Usuarios'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};


// Obtener un usuario por su ID
export const obtenerUsuario = async (req, res) => {
try {
const id_usuario = req.params.id_usuario;
const [result] = await pool.query('SELECT * FROM usuarios  WHERE id_usuario = ?', [id_usuario]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_usuario} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los usuarios.'
});
}
};


// Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    const {usuario, contraseña} = req.body;
    const [result] = await pool.query(
      'INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)',
      [usuario, contraseña]
    );
    res.status(201).json({id_usuario: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el usuario.',
      error: error
    });
  }
};


// ELIMINAR UN USUARIO POR SU ID
export const eliminarUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la usuario. El ID ${id_usuario} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la usuario.',
      error: error
    });
  }
};


// Actualizar un usuario por id 
export const actualizarUsuarioPatch = async (req, res) => {
  try {
    const {id_usuario} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Usuarios SET ? WHERE id_usuario = ?',
      [datos,  id_usuario ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Usuario con . ID ${id_usuario} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Usuario con ID ${id_usuario} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el usuario.',
      error: error
    });
  }
};