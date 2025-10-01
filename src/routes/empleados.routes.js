import { Router } from 'express';
import {obtenerEmpleados,obtenerempleado, registrarEmpelado,eliminarEmpleado, actualizarEmpleadoPatch} from '../controllers/empleado.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/empleados', obtenerEmpleados);

// Obtener un empleado por ID
router.get('/empleado/:id_empleado', obtenerempleado);

router.post('/registrarempleado', registrarEmpelado);

router.delete('/eliminarempleado/:id_empleado', eliminarEmpleado);

// Actualizar parcialmente un empleado por su ID
router.patch('/actualizarempleado/:id_empleado', actualizarEmpleadoPatch);

export default router;