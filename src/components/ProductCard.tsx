import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card" data-category={product.category} data-name={product.name} data-price={String(product.price)}>
      <div className={`product-image ${product.category === 'home' ? 'image-sage' : product.category === 'carry' ? 'image-coral' : 'image-blue'}`}>
        {product.tag ? <span className="product-tag">{product.tag}</span> : null}
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <strong>${product.price}</strong>
      </div>
      <button className="add-button" type="button" onClick={() => onAddToCart(product)}>
        Add to bag <span aria-hidden="true">+</span>
      </button>
    </article>
  );
}
