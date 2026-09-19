import type { CartItem } from '../types/product';

interface CartDrawerProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (itemIndex: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ cart, isOpen, onClose, onRemoveItem, onCheckout }: CartDrawerProps) {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <aside className={`cart-drawer ${isOpen ? 'is-open' : ''}`} data-cart-drawer aria-label="Shopping bag" aria-hidden={isOpen ? 'false' : 'true'}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Your bag</p>
            <h2>
              <span data-drawer-count>{count}</span> items
            </h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close shopping bag">
            ×
          </button>
        </div>
        <div className="cart-items" data-cart-items>
          {cart.length === 0 ? (
            <div className="cart-empty">
              Your bag is waiting.<br />
              <span>Add something considered.</span>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-line">
                <img src={item.image} alt={item.alt} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty {item.quantity}</p>
                  <button className="remove-item" type="button" onClick={() => onRemoveItem(index)}>
                    Remove
                  </button>
                </div>
                <span className="line-price">${item.price * item.quantity}</span>
              </div>
            ))
          )}
        </div>
        <div className="drawer-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong data-subtotal>${subtotal}</strong>
          </div>
          <button className="checkout-button" type="button" onClick={onCheckout}>
            Checkout <span aria-hidden="true">↗</span>
          </button>
          <p>Taxes and shipping calculated at checkout.</p>
        </div>
      </aside>
      <div className={`drawer-backdrop ${isOpen ? 'is-visible' : ''}`} onClick={onClose}></div>
    </>
  );
}
