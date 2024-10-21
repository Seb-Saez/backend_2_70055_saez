import express from "express";
import { authorizeRol } from "../middlewares/authorization.js";

const router = express.Router();

// admin crear productos

router.post('/products', authorizeRol("admin"), (req, res) => {
    // aca actualizar la logica para crear los productos
    res.send('Producto creado exitosamente');
});


// admin actualizar productos
router.put('/products/:id', authorizeRol("admin"), (req, res)=>{

// aca actualizar la logica para actualizar los productos
    // aca actualizar la logica para crear los productos
    res.send('Producto actualizado exitosamente');
});

//  solo admin puede eliminar productos
router.delete('/products/:id', authorizeRol("admin"), (req, res)=>{
    // aca actualizar la logica para crear los productos
    res.send('Producto eliminado');
});



export default router;