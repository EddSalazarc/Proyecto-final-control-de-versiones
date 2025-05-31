import express from 'express';
import cors from 'cors';
import ruta from './rutas/rutas.js';

const app = express();

//app.use(cors()); con esto le decimos al servidor que acepte solicitudes desde cualquier origen SIN RESTRICCIONES

app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());

app.use('/api',ruta);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`SERVIDOR CORRIENDO CORRECTAMENTE EN EL PUERTO:${PORT}`);
});