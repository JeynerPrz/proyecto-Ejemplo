import { Router } from 'express';
import {obtenerCategorias,obtenerCategoria, registrarCategoria,eliminarCategoria} from '../controllers/categorias.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/categorias', obtenerCategorias);

// Obtener una categoría por su ID
router.get('/categoria/:id_categoria', obtenerCategoria);

// Ruta para registrar una nueva categoría
router.post('/registrarcategoria', registrarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/eliminarcategoria/:id_categoria', eliminarCategoria);

export default router;