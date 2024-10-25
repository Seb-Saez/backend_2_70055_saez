import express from 'express';
import { ProductModel } from '../models/product.model.js';
import { authorizeRol } from '../middlewares/authRole.js';

const router = express.Router();

// Crear producto (solo admin)
router.post('/', authorizeRol("admin"), async (req, res) => {
    const { name, price, stock } = req.body;
    
    try {
        const newProduct = new ProductModel({ name, price, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error });
    }
});

// Actualizar producto (solo admin)
router.put('/:id', authorizeRol("admin"), async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, price, stock }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error });
    }
});

// Eliminar producto (solo admin)
router.delete('/:id', authorizeRol("admin"), async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el producto', error });
    }
});

export default router;
