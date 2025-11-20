import { pool } from '../../db_connecction.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Clientes'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};

// Obtener una categoría por su ID
export const obtenerCliente = async (req, res) => {
try {
const id_cliente = req.params.id_cliente;
const [result] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_cliente} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los clientes.'
});
}
};


// Registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula} = req.body;

    const [result] = await pool.query(
      'INSERT INTO clientes (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion,  cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [primer_nombre, 
      segundo_nombre, 
      primer_apellido, 
      segundo_apellido, 
      celular,
      direccion, 
      cedula]
    );

    res.status(201).json({ id_cliente: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el cliente.',
      error: error
    });
  }
};


// ELIMINAR UN CLIENTE POR SU ID
export const eliminarCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id_cliente]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la cliente. El ID ${id_cliente} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error
    });
  }
};


// Actualizar un cliente por id 
export const actualizarClientePatch = async (req, res) => {
  try {
    const {id_cliente} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Clientes SET ? WHERE id_cliente = ?',
      [datos,  id_cliente ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Cliente con . ID ${id_cliente} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Cliente con ID ${id_cliente} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la Cliente.',
      error: error
    });
  }
};