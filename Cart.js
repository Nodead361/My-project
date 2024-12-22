import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    // В этом примере мы предполагаем, что корзина хранится в localStorage
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const removeFromCart = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const updateQuantity = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Здесь вы можете добавить логику для оформления заказа
        alert('Checkout process started');
    };

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="list-group">
                        {cartItems.map((item) => (
                            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>${item.price} x {item.quantity}</p>
                                    <button 
                                        className="btn btn-secondary mr-2" 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total: ${getTotalPrice()}</h4>
                        <button onClick={handleCheckout} className="btn btn-primary">Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
