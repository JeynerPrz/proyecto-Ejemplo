import { Router } from 'express';
import {obtenerProductos,obtenerProducto, registrarProductos,eliminarProducto,actualizarProductoPatch} from '../controllers/producto.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

// Obtener una categoría por ID
router.get('/producto/:id_producto', obtenerProducto);

router.post('/registrarproducto', registrarProductos);

router.delete('/eliminarproducto/:id_producto', eliminarProducto);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizarproducto/:id_producto', actualizarProductoPatch);

export default router;