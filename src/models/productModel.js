import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    code: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: [String], default: [] },
});

const Product = mongoose.model("Product", productSchema);

export default Product;