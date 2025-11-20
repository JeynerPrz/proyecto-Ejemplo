import { Router } from 'express';
import {
  obtenerDetallesCompras,
  obtenerDetalleCompra,
  registrarDetalleCompra,
  eliminarDetalleCompra,
  actualizarDetalleCompraPatch,
  obtenerDetallesPorCompra
} from '../controllers/detalles_compras.controllers.js';

const router = Router();

// Rutas
router.get('/detalles_compras', obtenerDetallesCompras); // Obtener todos los detalles
router.get('/detalle_compra/:id_detalle_compra', obtenerDetalleCompra); // Obtener por ID detalle
router.get('/detalles_por_compra/:id_compra', obtenerDetallesPorCompra); // Obtener detalles por compra

router.post('/registrardetallecompra', registrarDetalleCompra); // Registrar detalle
router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra); // Eliminar detalle
router.patch('/actualizardetallecomprapatch/:id_detalle_compra', actualizarDetalleCompraPatch); // Actualizar detalle

export default router;
