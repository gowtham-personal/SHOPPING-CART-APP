import { useEffect } from "react";

import SomethingWentWrong from "@/components/bricks/SomethingWentWrong";
import CartSummary from "@/components/cart/CartSummary";
import Header from "@/components/Header";
import ProductList from "@/components/product/ProductList";
import { useCartStore } from "@/hooks/useCartStore";
import { useProductStore } from "@/hooks/useProductStore";

function App() {
  const { showCart } = useCartStore();
  const { productsError, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (productsError) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="w-full bg-gray-50">
      <Header />
      <div className="flex flex-col gap-8 p-3">
        {showCart && <CartSummary />}
        <ProductList />
      </div>
    </div>
  );
}

export default App;
