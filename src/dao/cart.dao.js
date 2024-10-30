import { CartModel } from '../models/cart.model.js';

class CartDAO {
    async createCart(userId) {
        const newCart = new CartModel({ user: userId, products: [] });
        return await newCart.save();
    }

    async getCartById(cid) {
        return await CartModel.findById(cid).populate('products.product');
    }

    async addProductToCart(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
        
        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }
        
        return await cart.save();
    }

    async updateCartAfterPurchase(cid, unavailableProducts) {
        const cart = await CartModel.findById(cid);
        cart.products = cart.products.filter(item => !unavailableProducts.includes(item.product._id));
        return await cart.save();
    }
}

export default new CartDAO();
