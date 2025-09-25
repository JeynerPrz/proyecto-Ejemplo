import { Router } from 'express';
import {obtenerProductos,obtenerProducto, registrarProductos,eliminarProducto} from '../controllers/producto.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

// Obtener una categoría por ID
router.get('/producto/:id_producto', obtenerProducto);

router.post('/registrarproducto', registrarProductos);

router.delete('/eliminarproducto/:id_producto', eliminarProducto);

export default router;