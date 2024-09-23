import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // created at, updated at
);

const Product = mongoose.model("Product", productSchema);
// mongo will convert Product to products (seen in db)


export default Product;