import { create } from "zustand";

// `set` will be a setter function
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    // need to change proxy setting in vite.config.js, so when we call "/api/products", it will add the prefix with "http://localhost:5000"
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const data = await res.json();
    // keep all previous products and add new product
    set((state) => ({ products: [...state.products, data.data] }));
    return {
      success: true,
      message: "Product created successfully",
    };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      // update global state
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
    }
    return {
      success: data.success,
      message: data.message,
    };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      // update global state immediately without refreshing
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
    }
    return {
      success: data.success,
      message: data.message,
    };
  },
}));
