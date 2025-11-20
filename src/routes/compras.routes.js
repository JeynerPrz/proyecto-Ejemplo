import { Router } from 'express';
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompraPatch
} from '../controllers/compras.controllers.js';

const router = Router();

// Rutas
router.get('/compras', obtenerCompras); 
router.get('/compra/:id_compra', obtenerCompra);
router.post('/registrarcompra', registrarCompra);
router.delete('/eliminarcompra/:id_compra', eliminarCompra);
router.patch('/actualizarcomprapatch/:id_compra', actualizarCompraPatch);

export default router;
