import { Router } from 'express';
import {obtenerDetalles_Compras,obtenerDetalles_Compra, registrarDetallesCompras,eliminarDetalleCompra, actualizarDetallesCompraPatch} from '../controllers/detalles_compras.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallescompras', obtenerDetalles_Compras);

// Obtener una categoría por ID
router.get('/detallescompra/:id_compra', obtenerDetalles_Compra);

router.post('/registrardetallescompra', registrarDetallesCompras);

router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizardetallecompra/:id_detalle_compra', actualizarDetallesCompraPatch);

export default router;