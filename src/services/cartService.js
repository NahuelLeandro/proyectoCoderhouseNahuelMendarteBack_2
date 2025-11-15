import cartDAO from "../dao/cartDao.js";

class CartService {
    async createCart() {
        return await cartDAO.createCart();
    }

    async getCartById(id) {
        const cart = await cartDAO.getCartById(id);
        if (!cart) throw new Error("Carrito no encontrado");
        return cart;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const updated = await cartDAO.addProductToCart(cartId, productId, quantity);
        if (!updated) throw new Error("No se pudo agregar el producto");
        return updated;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const updated = await cartDAO.updateProductQuantity(cartId, productId, quantity);
        if (!updated) throw new Error("No se pudo actualizar la cantidad");
        return updated;
    }

    async deleteProductFromCart(cartId, productId) {
        const updated = await cartDAO.deleteProductFromCart(cartId, productId);
        if (!updated) throw new Error("No se pudo eliminar el producto del carrito");
        return updated;
    }

    async replaceCartProducts(cartId, products) {
        const updated = await cartDAO.replaceCartProducts(cartId, products);
        if (!updated) throw new Error("No se pudo reemplazar el carrito");
        return updated;
    }

    async clearCart(cartId) {
        const cleared = await cartDAO.clearCart(cartId);
        if (!cleared) throw new Error("No se pudo vaciar el carrito");
        return cleared;
    }
}

export default new CartService();