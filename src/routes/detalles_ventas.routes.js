import { Router } from 'express';
import {actualizarDetalleVentaPatch, eliminarDetalleVenta, obtenerDetallesVentas, obtenerDetalleVenta, registrarDetalleVenta} from '../controllers/detalles_ventas.controlles.js';

const router = Router();

// Rutas
router.get('/detalles_ventas', obtenerDetallesVentas); // Ruta para obtener todos los DETALLES_VENTAS 

// RUTA PARA OBTENER UN DETALLE_VENTA POR SU ID 
router.get('/detalle_venta/:id_detalle_venta', obtenerDetalleVenta);

// RUTA PARA REGISTRAR UN DETALLE_VENTA  
router.post ('/registrardetalleventa' , registrarDetalleVenta);

// RUTA PARA ELIMINAR UN DETALLE_VENTA POR SU ID
router.delete('/eliminardetalleventa/:id_detalle_venta', eliminarDetalleVenta);

// RUTA PARA ACTUALIZAR UN DETALLE VENTA POR SU ID 
router.patch('/actualizardetalleventapatch/:id_detalle_venta', actualizarDetalleVentaPatch);

export default router;