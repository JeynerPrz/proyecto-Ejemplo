import { Router } from 'express';
import {obtenerUsuarios, obtenerUsuario, registrarUsuario, eliminarUsuario, actualizarUsuarioPatch} from '../controllers/usuarios.controllers.js';

const router = Router();

// Rutas
router.get('/usuarios', obtenerUsuarios); // Ruta para obtener todos los usuarios

// RUTA PARA OBTENER UN USUARIO POR SU ID 
router.get('/usuario/:id_usuario', obtenerUsuario);

// RUTA PARA REGISTRAR UN USUARIO
router.post ('/registrarusuario' , registrarUsuario);

// RUTA PARA ELIMINAR UN USUARIO POR SU ID
router.delete('/eliminarusuario/:id_usuario', eliminarUsuario);

// RUTA PARA ACTUALIZAR UN USUARIO POR SU ID 
router.patch('/actualizarusuariopatch/:id_usuario', actualizarUsuarioPatch);

export default router;