import express from 'express';
//import { ProductModel } from '../models/product.model.js';
import { authorizeRol } from '../middlewares/authRole.js';
import ProductDAO from '../dao/product.dao.js';
import ProductDTO from '../DTO/product.dto.js';


const router = express.Router();

// crear producto nuevo solo el admin
router.post('/', authorizeRol("admin"), async (req, res) => {
    const { name, price, stock } = req.body;
    
    try {
        const newProduct = await ProductDAO.createProduct({ name, price, stock });
        const productDTO = new ProductDTO(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente', product: productDTO });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error });
    }
});

// actualizar un producto solo el admin
router.put('/:id', authorizeRol("admin"), async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    try {
        const updatedProduct = await ProductDAO.updateProduct(id, { name, price, stock });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        const productDTO = new ProductDTO(updatedProduct);
        res.json({ message: 'Producto actualizado exitosamente', product: productDTO });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error });
    }
});

// eliminar producto solo el admin
router.delete('/:id', authorizeRol("admin"), async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await ProductDAO.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el producto', error });
    }
});

export default router;
