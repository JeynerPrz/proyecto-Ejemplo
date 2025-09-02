import { Router } from 'express';
import { obtenerCategorias } from '../controllers/categorias.controller.js';

 const router = Router();



 // ruta para obtener todos los  clientes

 router.get('/categorias',  obtenerCategorias)

  export default router;