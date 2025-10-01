import { Router } from 'express';
import {obtenerDetalles_Ventas,obtenerDetalles_Venta, registrarDetallesVentas,eliminarDetalleVenta, actualizarDetallesVentaPatch} from '../controllers/detalles_ventas.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallesventas', obtenerDetalles_Ventas);

// Obtener una categoría por ID
router.get('/detallesventa/:id_detalle_venta', obtenerDetalles_Venta);

router.post('/registrardetallesventas', registrarDetallesVentas);

router.delete('/eliminardetalleventa/:id_detalle_venta', eliminarDetalleVenta);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizardetalleventa/:id_detalle_venta', actualizarDetallesVentaPatch);

export default router;