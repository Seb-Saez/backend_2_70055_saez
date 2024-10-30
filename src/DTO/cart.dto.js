export class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.user = cart.user;
        this.products = cart.products.map(p => ({
            product: p.product._id,
            quantity: p.quantity,
            name: p.product.name,
            price: p.product.price
        }));
    }
}
