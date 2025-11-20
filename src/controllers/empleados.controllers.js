import { pool } from '../../db_connecction.js';
// Obtener todos los Empleados
export const obtenerEmpleados = async (req, res) => { //async es para hacer multiples tareas a la vez 
  try {
    const [result] = await pool.query('SELECT * FROM Empleados'); // pool.query es para hacer una consuta con la bd
    res.json(result);
  } catch (error) {
    return res.status(500).json({ // status (500) es un error en el servidor
      mensaje: 'Ha ocurrido un error al leer los datos.',
      error: error
    });
  }
};


// Obtener un empleado por su ID
export const obtenerEmpleado = async (req, res) => {
try {
const id_empleado = req.params.id_empleado;
const [result] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id_empleado]);
if (result.length <= 0) {
return res.status(404).json({
mensaje: `Error al leer los datos. ID ${id_empleado} no encontrado.`
});
}
res.json(result[0]);
} catch (error) {
return res.status(500).json({
mensaje: 'Ha ocurrido un error al leer los datos de los Empleados.'
});
}
};


// Registrar un nuevo empleado
export const registrarEmpleado = async (req, res) => {
  try {
    const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion} = req.body;
    const [result] = await pool.query(
      'INSERT INTO empleados (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion]
    );
    res.status(201).json({id_empleado: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el empleado.',
      error: error
    });
  }
};


// ELIMINAR UN EMPLEADO POR SU ID
export const eliminarEmpleado = async (req, res) => {
  try {
    const id_empleado = req.params.id_empleado;
    const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id_empleado]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la empleado. El ID ${id_empleado} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la empleado.',
      error: error
    });
  }
};


// Actualizar un empleado por id 
export const actualizarEmpleadoPatch = async (req, res) => {
  try {
    const {id_empleado} = req.params;
    const datos  = req.body;

    const [result] = await pool.query(
      'UPDATE Empleados SET ? WHERE id_empleado = ?',
      [datos,  id_empleado ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje:' Empleado con . ID ${id_empleado} no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Empleado con ID ${id_empleado} actualizada correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la empleado.',
      error: error
    });
  }
};