import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook para facilitar el acceso al contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    // Sincroniza el carrito con localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Agregar un producto al carrito
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            const availableStock = product.cantidad_disponible;
            const currentCartQuantity = existingItem ? existingItem.quantity : 0;

            if (currentCartQuantity + quantity <= availableStock) {
                if (existingItem) {
                    toast.success(`${product.nombre} actualizado en el carrito. Cantidad: ${currentCartQuantity + quantity}`, {
                        autoClose: 1500,
                    });
                    return prevItems.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    toast.success(`${product.nombre} agregado al carrito. Cantidad: ${quantity}`, {
                        autoClose: 1500,
                    });
                    return [...prevItems, { ...product, quantity }];
                }
            } else {
                toast.warn(`No puedes agregar más de ${availableStock} unidades de ${product.nombre}.`, {
                    autoClose: 1500,
                });
                return prevItems;
            }
        });
    };

    // Actualizar la cantidad de un producto en el carrito
    const updateCartItemQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    // Eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
        toast.info('Producto eliminado del carrito.', {
            autoClose: 1500,
        });
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        toast.info('Carrito vacío.', {
            autoClose: 1500,
        });
    };

    // Proveer los valores del contexto
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateCartItemQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
