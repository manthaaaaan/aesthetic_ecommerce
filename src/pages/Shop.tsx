import { ProductGrid } from '../components/ProductGrid';
import type { Product } from '../types/product';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedFilter: 'all' | 'home' | 'carry' | 'ritual';
  onFilterChange: (filter: 'all' | 'home' | 'carry' | 'ritual') => void;
}

export function Shop({ products, onAddToCart, selectedFilter, onFilterChange }: ShopProps) {
  return (
    <main id="main-content">
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The full collection</p>
            <h2>Made to live with.</h2>
          </div>
          <p className="heading-note">A slow-made edit of crochet essentials for home, carry, and ritual.</p>
        </div>

        <div className="category-strip" aria-label="Shop by category">
          <span className="section-label">Browse by</span>
          <div className="category-list">
            <button className={`category-chip ${selectedFilter === 'all' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('all')}>All objects</button>
            <button className={`category-chip ${selectedFilter === 'home' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('home')}>Home</button>
            <button className={`category-chip ${selectedFilter === 'carry' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('carry')}>Carry</button>
            <button className={`category-chip ${selectedFilter === 'ritual' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('ritual')}>Ritual</button>
          </div>
          <span className="item-count">{String(products.length).padStart(2, '0')} objects</span>
        </div>

        <ProductGrid products={products} onAddToCart={onAddToCart} />
        <p className="empty-state" data-empty-state>No objects match that search.</p>
      </section>
    </main>
  );
}
