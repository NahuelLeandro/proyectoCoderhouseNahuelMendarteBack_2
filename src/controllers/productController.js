import productService from "../services/productService.js";

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json({ status: "success", payload: products });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.pid);
            res.json({ status: "success", payload: product });
        } catch (error) {
            res.status(404).json({ status: "error", message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const created = await productService.createProduct(req.body);
            res.status(201).json({ status: "success", payload: created });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async updatedProductById(req, res) {
        try {
            const updated = await productService.updateProduct(req.params.pid, req.body);
            res.json({ status: "success", payload: updated });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async deleteProductById(req, res) {
        try {
            const deleted = await productService.deleteProduct(req.params.pid);
            res.json({ status: "success", payload: deleted });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new ProductController();