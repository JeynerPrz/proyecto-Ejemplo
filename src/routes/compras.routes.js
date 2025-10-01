import { Router } from 'express';
import {obtenerCompras,obtenerCompra, registrarCompra,eliminarCompra, actualizarCompraPatch} from '../controllers/compra.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/compras', obtenerCompras);

// Obtener una categoría por ID
router.get('/compra/:id_compra', obtenerCompra);

// Registrar una nueva categoría
router.post('/registrarcompra', registrarCompra);

router.delete('/eliminarcompra/:id_compra', eliminarCompra);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizarcompra/:id_compra', actualizarCompraPatch);

export default router;