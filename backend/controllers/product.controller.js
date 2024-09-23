import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data
    
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }
    
    const newProduct = new Product(product);

    try {
        newProduct.save();
        res.status(201).json({success: true, message: "Product created successfully" });
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: "server error" });
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // empty object means all
        res.status(200).json({success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "server error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // id from url
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(500).json({success: false, message: "server error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({success: true, data: updatedProduct, message: "Product updated successfully" });
    }
    catch (error) {
        console.log("Error in updating product: ", error.message);
        res.status(500).json({success: false, message: "server error" });
    }
}