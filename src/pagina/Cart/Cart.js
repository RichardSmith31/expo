import React from "react";
import { useCart } from "../../context/CartContext/CartContext"; // Uso del hook
import Header from "../../componentes/Header/Header";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div>
      <Header></Header>
      <div className="cart">
        <h2>Carrito</h2>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.nombre} />
                  <div className="cart-item-info">
                    <h3>{item.nombre}</h3>
                    <p>Precio: ${item.precio}</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItemQuantity(
                          item.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                    <button onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={clearCart}>Vaciar Carrito</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
