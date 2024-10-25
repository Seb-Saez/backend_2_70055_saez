import express from 'express';
import { CartModel } from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';
import { TicketModel } from '../models/ticket.model.js';
import { verifyToken } from '../middlewares/verifyToken.js';




const router = express.Router();



//    crear un nuevo carrito
router.post('/', verifyToken, async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id;

        const newCart = new CartModel({
            user: userId,  // Asignar el ID del usuario autenticado
            products: []   // inicializamos con un array vacio
        });

        await newCart.save();
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el carrito', error });
    }
});


//   obtener carrito por :cid
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json({message: 'Informacion del carrito' , cart});
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el carrito', error });
    }
});




//     agregar un producto al carrito por :pid y :cid
router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    // console.log("valores de la request:", req.params, req.body);

    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const product = await ProductModel.findById(pid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const existingProduct = cart.products.find(p => p.product.toString() === pid);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
});



//  finalizar la compra purchase
router.post('/:cid/purchase', verifyToken, async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await CartModel.findById(cid).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const unavailableProducts = [];

        // recorremos  los prod del carrito
        for (let item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;

            // verificamos stock en bdd
            if (product.stock >= quantity) {
                // descontamos del stock en la bbdd
                product.stock -= quantity;
                await product.save();

                //    sumamos el precio total de los productos comprados
                totalAmount += product.price * quantity;
            } else {
                //   si no hay suficiente stock, lo agregamos a la lista de no disponibles
                unavailableProducts.push(product._id);
            }
        }

        // generacion de ticket
        if (totalAmount > 0) {
            const ticket = new TicketModel({
                code: generateUniqueCode(),        // usamos la funcion de abajo para generar un codigo unico
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.user.email        // email del usuario
            });
            await ticket.save();

            // en caso de que no se pueda realizar la compra filtramos los prodcutos que no se pueden comprar
            cart.products = cart.products.filter(item => unavailableProducts.includes(item.product._id));
            await cart.save();

            res.status(200).json({
                message: 'Compra realizada con éxito',
                ticket,
                unavailableProducts
            });
        } else {
            res.status(400).json({ message: 'No se pudo completar la compra, productos fuera de stock', unavailableProducts });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la compra', error });
    }
});

export default router;

// función para generar código único
function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
}
