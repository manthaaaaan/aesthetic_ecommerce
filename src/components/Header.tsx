import { Link } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onSearchToggle: () => void;
  isSearchVisible: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({
  cartCount,
  onCartToggle,
  onSearchToggle,
  isSearchVisible,
  searchValue,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="announcement">
        Handmade in small batches <span aria-hidden="true">↗</span>
      </div>
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="wordmark" to="/" aria-label="Woven Thread Co. home">
          woven<span>°</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <a href="/#story">Our approach</a>
          <a href="/#journal">Journal</a>
        </div>
        <div className="nav-actions">
          <button className="icon-button" type="button" aria-label="Search" onClick={onSearchToggle}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="m16 16 4.5 4.5"></path>
            </svg>
          </button>
          <button className="cart-button" type="button" onClick={onCartToggle} aria-label={`Open bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}>
            Bag <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>
      <div className={`search-bar ${isSearchVisible ? 'is-visible' : ''}`} data-search-panel>
        <label htmlFor="search-input">Search the collection</label>
        <input
          id="search-input"
          type="search"
          placeholder="Try “throw” or “basket”"
          autoComplete="off"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  );
}
