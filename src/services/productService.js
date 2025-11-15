import productDAO from "../dao/productDao.js";

class ProductService {
    async getAllProducts() {
        return await productDAO.getAll();
    }

    async getProductById(id) {
        const product = await productDAO.getById(id);
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    async createProduct(data) {
        const { title, price, code } = data;
        if (!title || !price || !code) {
        throw new Error("Campos obligatorios faltantes");
        }
        return await productDAO.create(data);
    }

    async updateProduct(id, data) {
        const updated = await productDAO.updateById(id, data);
        if (!updated) throw new Error("Producto no encontrado o no actualizado");
        return updated;
    }

    async deleteProduct(id) {
        const deleted = await productDAO.deleteById(id);
        if (!deleted) throw new Error("Producto no encontrado");
        return deleted;
    }
}

export default new ProductService();