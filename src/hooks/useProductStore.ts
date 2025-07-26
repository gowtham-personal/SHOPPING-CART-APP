/**
 * @file useProductStore.ts
 * @description This hook is used to store the products in the store.
 * kind of a getter and setter for the products.
 */

import { create } from "zustand";

import type { Product } from "@/interfaces/product";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  isProductsLoading: boolean;
  setIsProductsLoading: (isProductsLoading: boolean) => void;
  productsError: string;
  setProductsError: (productsError: string) => void;
}

/**
 * @description This hook is used to store the products and cart in the store.
 * @returns {ProductStore} The product store.
 */
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  isProductsLoading: false,
  setIsProductsLoading: (isProductsLoading) => set({ isProductsLoading }),
  productsError: "",
  setProductsError: (productsError) => set({ productsError }),

  /**
   * @description This function is used to fetch the products from the API.
   * @returns {Promise<void>} The products.
   */
  fetchProducts: async () => {
    try {
      set({ isProductsLoading: true });
      const API_URL =
        "https://equalexperts.github.io/frontend-take-home-test-data/products.json";
      const response = await fetch(API_URL);
      const products: Product[] = await response.json();
      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ productsError: "Error fetching products" });
    } finally {
      set({ isProductsLoading: false });
    }
  },
}));
