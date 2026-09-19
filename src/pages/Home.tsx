import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import type { Product } from '../types/product';

interface HomeProps {
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
  selectedFilter: 'all' | 'home' | 'carry' | 'ritual';
  onFilterChange: (filter: 'all' | 'home' | 'carry' | 'ritual') => void;
}

export function Home({ featuredProducts, onAddToCart, selectedFilter, onFilterChange }: HomeProps) {
  const featuredText = useMemo(() => `${String(featuredProducts.length).padStart(2, '0')} pieces`, [featuredProducts.length]);

  return (
    <main id="main-content">
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Handmade for slow days</p>
          <h1>
            Softly made,<br />
            <em>daily loved.</em>
          </h1>
          <p className="hero-text">
            Textural pieces with a story in every stitch—crafted for cozy corners, warm rituals, and everyday comfort.
          </p>
          <Link className="text-link" to="/shop">
            Explore the collection <span aria-hidden="true">↘</span>
          </Link>
        </div>
        <div className="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=85" alt="Crochet yarn and handmade textile pieces" />
          <div className="image-note">No. 001 / Wool & wonder</div>
        </div>
      </section>

      <section className="category-strip" aria-label="Featured collection">
        <span className="section-label">Featured edit</span>
        <div className="category-list">
          <button className={`category-chip ${selectedFilter === 'all' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('all')}>
            All featured
          </button>
          <button className={`category-chip ${selectedFilter === 'home' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('home')}>
            Home
          </button>
          <button className={`category-chip ${selectedFilter === 'carry' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('carry')}>
            Carry
          </button>
          <button className={`category-chip ${selectedFilter === 'ritual' ? 'is-active' : ''}`} type="button" onClick={() => onFilterChange('ritual')}>
            Ritual
          </button>
        </div>
        <span className="item-count">{featuredText}</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The current edit</p>
            <h2>Featured pieces.</h2>
          </div>
          <p className="heading-note">A small selection of our most-loved crochet essentials.</p>
        </div>
        <ProductGrid products={featuredProducts} onAddToCart={onAddToCart} />
        <p className="empty-state" data-empty-state>
          No featured pieces match that search.
        </p>
        <Link className="text-link" to="/shop">
          View the full collection <span aria-hidden="true">↘</span>
        </Link>
      </section>

      <section className="story-section" id="story">
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" alt="Crochet work in a bright and cozy studio" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Our approach</p>
          <h2>Made for the slow, soft life.</h2>
          <p>
            We design crochet pieces that feel as good as they look: textured, tactile, and made to settle gently into home rituals. Every piece is handmade in thoughtful color stories that make a room feel more lived-in and loved.
          </p>
          <a className="text-link" href="#journal">
            Read our notes <span aria-hidden="true">↘</span>
          </a>
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div>
          <p className="eyebrow">From the journal</p>
          <h2>Things worth noticing.</h2>
        </div>
        <a className="text-link" href="#top">
          See all notes <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
