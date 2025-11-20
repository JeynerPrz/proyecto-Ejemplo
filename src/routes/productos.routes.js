import { Router } from 'express';
import {obtenerProductos, obtenerProducto, registrarProducto, eliminarProducto, actualizarProductoPatch} from '../controllers/productos.controllers.js';

const router = Router();

// Rutas
router.get('/productos', obtenerProductos); // Ruta para obtener todos los productos 

// RUTA PARA OBTENER UN PRODUCTO POR SU ID 
router.get('/producto/:id_producto', obtenerProducto);

// RUTA PARA REGISTRAR UN PRODUCTO
router.post ('/registrarproducto' , registrarProducto);

// RUTA PARA ELIMINAR UN PRODUCTO POR SU ID
router.delete('/eliminarproducto/:id_producto', eliminarProducto);

// RUTA PARA ACTUALIZAR UN PRODUCTO POR SU ID 
router.patch('/actualizarproductopatch/:id_producto', actualizarProductoPatch);

export default router;