import { ProductModel } from '../models/product.model.js';

class ProductDAO {
    async createProduct(data) {
        return await ProductModel.create(data);
    }

    async getProductById(id) {
        return await ProductModel.findById(id);
    }

    async updateProduct(id, data) {
        return await ProductModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }

    async getAllProducts() {
        return await ProductModel.find();
    }
}

export default new ProductDAO();