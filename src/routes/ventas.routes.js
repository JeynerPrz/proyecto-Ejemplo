import { Router } from 'express';
import {obtenerVentas, obtenerVenta, registrarVenta, eliminarVenta, actualizarVentaPatch} from '../controllers/ventas.controllers.js';

const router = Router();

// Rutas
router.get('/ventas', obtenerVentas); // Ruta para obtener todas las ventas

// RUTA PARA OBTENER UNA VENTA POR SU ID 
router.get('/venta/:id_venta', obtenerVenta);

// RUTA PARA REGISTRAR UNA VENTA
router.post ('/registrarventa' , registrarVenta);

// RUTA PARA ELIMINAR UNA VENTA POR SU ID
router.delete('/eliminarventa/:id_venta', eliminarVenta);

// RUTA PARA ACTUALIZAR UNA VENTA POR SU ID 
router.patch('/actualizarventapatch/:id_compra', actualizarVentaPatch);

export default router;