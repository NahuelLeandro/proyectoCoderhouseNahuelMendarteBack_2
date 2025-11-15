import cartService from "../services/cartService.js";

class CartController {
    async createCart(req, res) {
        try {
        const newCart = await cartService.createCart();
        res.status(201).json({ status: "success", payload: newCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }

    async getCartById(req, res) {
        try {
        const cart = await cartService.getCartById(req.params.cid);
        res.json({ status: "success", payload: cart });
        } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartService.addProductToCart(
            cid,
            pid,
            quantity || 1
        );
        res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }

    async updateProductQuantity(req, res) {
        try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartService.updateProductQuantity(
            cid,
            pid,
            quantity
        );
        res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }

    async deleteProductFromCart(req, res) {
        try {
        const { cid, pid } = req.params;
        const updatedCart = await cartService.deleteProductFromCart(cid, pid);
        res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }

    async replaceCartProducts(req, res) {
        try {
        const { cid } = req.params;
        const { products } = req.body;
        const updatedCart = await cartService.replaceCartProducts(cid, products);
        res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }

    async clearCart(req, res) {
        try {
        const { cid } = req.params;
        const clearedCart = await cartService.clearCart(cid);
        res.status(200).json({ status: "success", payload: clearedCart });
        } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new CartController();
