import { Router } from 'express';
import {obtenerClientes,obtenerCliente, registrarCliente,eliminarCliente, actualizarClientePatch} from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/clientes', obtenerClientes);

// Obtener una categoría por su ID
router.get('/cliente/:id_cliente', obtenerCliente);

// Ruta para registrar una nueva cliente
router.post('/registrarcliente', registrarCliente);

// Eliminar una categoría por ID
router.delete('/eliminarCliente/:id_cliente', eliminarCliente);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizarCliente/:id_cliente', actualizarClientePatch);

export default router;