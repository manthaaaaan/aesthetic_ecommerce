import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { products } from './data/products';
import type { CartItem, Product, ProductCategory } from './types/product';

const FEATURED_PRODUCTS = products.slice(0, 3);

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | ProductCategory>('all');
  const [toastVisible, setToastVisible] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    if (!toastVisible) return;
    const timeout = window.setTimeout(() => setToastVisible(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
    setToastVisible(true);
  };

  const removeFromCart = (itemIndex: number) => {
    setCart((currentCart) => currentCart.filter((_, index) => index !== itemIndex));
  };

  const handleCheckout = () => {
    if (cart.length) {
      window.alert('Checkout is ready for your next step.');
    }
  };

  const filterProducts = (items: Product[]) =>
    items.filter((product) => {
      const matchesFilter = selectedFilter === 'all' || product.category === selectedFilter;
      const term = searchValue.toLowerCase();
      const matchesSearch = !term || product.name.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });

  const featuredProducts = filterProducts(FEATURED_PRODUCTS);
  const visibleShopProducts = filterProducts(products);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen((open) => !open)}
        onSearchToggle={() => setIsSearchVisible((current) => !current)}
        isSearchVisible={isSearchVisible}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              featuredProducts={featuredProducts}
              onAddToCart={addToCart}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              products={visibleShopProducts}
              onAddToCart={addToCart}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          }
        />
      </Routes>

      <Footer />

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <div className={`toast ${toastVisible ? 'is-visible' : ''}`} role="status" aria-live="polite">
        Added to your bag
      </div>

      <div className="sunset-sticker" aria-label="Built by Sunset Lab">
        <span>built by</span>
        <strong>sunset lab</strong>
      </div>
    </>
  );
}

export default App;
