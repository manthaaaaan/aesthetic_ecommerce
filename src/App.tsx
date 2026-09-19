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

      <div className="sunset-labs-brand">
        <span className="built-by-text">Built by</span>
        <a href="https://sunsetlabs.live" target="_blank" rel="noopener noreferrer" className="sunset-labs-logo">
          <svg className="sunset-icon-svg" viewBox="0 0 168 167" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M77.68 5.47656C78.3194 -1.82553 88.9948 -1.82553 89.6342 5.47656L91.6224 28.1801C92.1216 33.8803 99.5578 35.7132 102.649 30.8978L114.96 11.7189C118.92 5.55037 128.372 10.5114 125.545 17.2743L116.755 38.3012C114.548 43.5805 120.28 48.6591 125.255 45.8318L145.069 34.571C151.442 30.9493 157.506 39.7349 151.86 44.4092L134.305 58.9425C129.897 62.5914 132.613 69.7524 138.332 69.5609L161.109 68.798C168.435 68.5526 169.722 79.1501 162.55 80.6651L140.252 85.3754C134.653 86.558 133.73 94.1609 138.883 96.6489L159.406 106.559C166.007 109.746 162.221 119.728 155.167 117.736L133.234 111.544C127.727 109.99 123.377 116.293 126.783 120.89L140.35 139.203C144.713 145.092 136.723 152.171 131.402 147.13L114.859 131.454C110.705 127.519 103.924 131.078 104.803 136.732L108.306 159.252C109.432 166.494 99.0674 169.049 96.699 162.112L89.3353 140.544C87.4864 135.129 79.8278 135.129 77.9789 140.544L70.6152 162.112C68.2468 169.049 57.8817 166.494 59.0083 159.252L62.5112 136.732C63.3907 131.078 56.6093 127.519 52.4556 131.454L35.9123 147.13C30.5914 152.171 22.6008 145.092 26.9644 139.203L40.5314 120.89C43.9377 116.293 39.5871 109.99 34.0802 111.544L12.1471 117.736C5.09275 119.728 1.30723 109.746 7.90805 106.559L28.4311 96.6489C33.5839 94.1609 32.6608 86.558 27.0623 85.3754L4.764 80.6651C-2.40777 79.1501 -1.12101 68.5526 6.20492 68.798L28.9825 69.5609C34.7014 69.7524 37.4172 62.5914 33.0095 58.9425L15.4544 44.4092C9.80811 39.7349 15.872 30.9493 22.2451 34.571L42.0592 45.8318C47.0339 48.6591 52.7665 43.5805 50.5595 38.3012L41.7692 17.2743C38.9419 10.5114 48.3945 5.55037 52.3541 11.7189L64.6654 30.8978C67.7565 35.7132 75.1926 33.8803 75.6918 28.1801L77.68 5.47656Z" fill="url(#sunset-gradient)" />
            <defs>
              <linearGradient id="sunset-gradient" x1="83.6571" y1="-62.7766" x2="83.6571" y2="231.223" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFB00" />
                <stop offset="1" stopColor="#DD0808" />
              </linearGradient>
            </defs>
          </svg>
          <span className="sunset-text">SUNSET LABS</span>
        </a>
      </div>
    </>
  );
}

export default App;
