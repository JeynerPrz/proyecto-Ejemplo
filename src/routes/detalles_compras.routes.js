import { Router } from 'express';
import { 
  obtenerDetalles_Compras,
  obtenerDetalles_Compra,
  registrarDetallesCompras,
  eliminarDetalleCompra 
} from '../controllers/detalles_compras.controller.js';

const router = Router();

// Obtener todas las compras
router.get('/detallescompras', obtenerDetalles_Compras);

// Obtener una compra por ID
router.get('/detallescompra/:id_compra', obtenerDetalles_Compra);

// Registrar una compra
router.post('/registrardetallescompra', registrarDetallesCompras);

// Eliminar una compra por ID
router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra);

export default router;
