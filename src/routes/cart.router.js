import express from 'express';
import { authorizeRol } from '../middlewares/authRole.js';

const router = express.Router();

// usuarios pueden agregar productos al carrito
router.post('/cart', authorizeRol('user'), (req, res) => {

    // actualizar la logica para agregar producto al carrito

    res.send('Producto agregado al carrito');
});

export default router;
