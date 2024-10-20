import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext/CartContext";
import Header from "../../componentes/Header/Header";
import "./Cart.css";
import Footer from "../../componentes/Footer/Footer";
import Breadcrumbs from "../../componentes/Breadcrumbs/Breadcrumbs";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } =
    useCart();

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
        setIsLoading(false);
      });
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowPaymentOptions(true);
  };

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <div className="cart-container">
        <h2>Tu Carrito</h2>
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío.</p>
            <a href="/productos" className="shop-btn">
              Ver productos
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div>
                      <h3>{item.nombre}</h3>
                      <p className="item-price">${item.precio}</p>
                      <div className="cart-item-quantity">
                        <button 
                          onClick={() => 
                            item.quantity > 1 
                              ? updateCartItemQuantity(item.id, item.quantity - 1) 
                              : null
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          readOnly
                        />
                        <button 
                          onClick={() => 
                            updateCartItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>Total: ${item.precio * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Resumen del pedido</h3>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Envío: Gratis</p>
              <h3>Total: ${subtotal.toFixed(2)}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceder a pagar
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
            {showPaymentOptions && (
              <div className="payment-options">
                <h4>Elegir método de pago</h4>
                <label>
                  <input type="radio" name="paymentMethod" value="creditCard" /> 
                  Tarjeta de crédito
                </label>
                <label>
                  <input type="radio" name="paymentMethod" value="cashOnDelivery" />
                  Contraentrega
                </label>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
