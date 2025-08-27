
//Importar las dependencias necesartas 
import express from 'express'; 
 import cors from 'cors';


//Importar las rutas
import rutasCategorias from './src/routes/categorias.routes.js';

// Crear la aplicación de Express
const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-type'],
}));



// Middleware para parsear el cuerpo de las solicitudes 

app.use(express.json({ limit: '10mb' })); //10 MB

app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas:
app.use('/api', rutasCategorias);


// Manejo de rutas no encontradas 

app.use((req, res, next) => {
    
res.status(404).json({
message: "La ruta que ha especificado no se encuentra registrada."
});
});


// Exportar la aplicación export default app;
export default app;