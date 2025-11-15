import Cart from "../models/cartModel.js";

class CartDAO {
    async createCart() {
        const newCart = new Cart({ products: [] });
        return await newCart.save();
    }

    async getCartById(id) {
        return await Cart.findById(id).populate("products.product");
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        const existingProduct = cart.products.find((p) =>
        p.product.equals(productId)
        );

        if (existingProduct) {
        existingProduct.quantity += quantity;
        } else {
        cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        const productInCart = cart.products.find((p) =>
        p.product.equals(productId)
        );
        if (!productInCart) return null;

        productInCart.quantity = quantity;
        return await cart.save();
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        cart.products = cart.products.filter((p) => !p.product.equals(productId));
        return await cart.save();
    }

    async replaceCartProducts(cartId, newProducts) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        cart.products = newProducts;
        return await cart.save();
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        cart.products = [];
        return await cart.save();
    }
}

export default new CartDAO();