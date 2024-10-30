import express from 'express';
import CartDAO from '../dao/cart.dao.js';
import TicketDAO from '../dao/ticket.dao.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { CartDTO } from '../DTO/cart.dto.js';
import { TicketDTO } from '../DTO/ticket.dto.js';

const router = express.Router();

// crear carrito nuevo
router.post('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const newCart = await CartDAO.createCart(userId);
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: new CartDTO(newCart) });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el carrito', error });
    }
});

// traer carrito poe :cid
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartDAO.getCartById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json({ message: 'Información del carrito', cart: new CartDTO(cart) });
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el carrito', error });
    }
});

// agregar un producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await CartDAO.addProductToCart(cid, pid, quantity);

        if (!updatedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: 'Producto agregado al carrito', cart: new CartDTO(updatedCart) });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
});

// finalizar la compra
router.post('/:cid/purchase', verifyToken, async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartDAO.getCartById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        let totalAmount = 0;
        const unavailableProducts = [];

        for (let item of cart.products) {
            const product = item.product;
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                totalAmount += product.price * item.quantity;
            } else {
                unavailableProducts.push(product._id);
            }
        }

        if (totalAmount > 0) {
            const ticketData = {
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.user.email
            };
            const ticket = await TicketDAO.createTicket(ticketData);
            await CartDAO.updateCartAfterPurchase(cid, unavailableProducts);

            res.status(200).json({
                message: 'Compra realizada con éxito',
                ticket: new TicketDTO(ticket),
                unavailableProducts
            });
        } else {
            res.status(400).json({ message: 'No se pudo completar la compra, productos fuera de stock', unavailableProducts });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la compra', error });
    }
});

// fx para generar codigo unico
function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
}

export default router;
