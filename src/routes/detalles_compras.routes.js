import { Router } from 'express';
import {obtenerDetallesCompras, obtenerDetalleCompra, registrarDetalleCompra, eliminarDetalleCompra, actualizarDetalleCompraPatch } from '../controllers/detalles_compras.controllers.js';

const router = Router();

// Rutas
router.get('/detalles_compras', obtenerDetallesCompras); // Ruta para obtener todos los DETALLES_COMPRAS

// RUTA PARA OBTENER UN DETALLE_COMPRA POR SU ID 
router.get('/detalle_compra/:id_detalle_compra', obtenerDetalleCompra);

// RUTA PARA REGISTRAR UN DETALLE_COMPRA  
router.post ('/registrardetallecompra' , registrarDetalleCompra);

// RUTA PARA ELIMINAR UN DETALLE_COMPRA POR SU ID
router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra);

// RUTA PARA ACTUALIZAR UN DETALLE COMPRA POR SU ID 
router.patch('/actualizardetallecomprapatch/:id_detalle_compra', actualizarDetalleCompraPatch);

export default router;