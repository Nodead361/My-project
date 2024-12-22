import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/marketplace/api/products.php')
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));

        // Загрузка корзины из localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Если товар уже в корзине, увеличиваем его количество
            existingItem.quantity += 1;
        } else {
            // Если товара еще нет в корзине, добавляем новый товар
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="container mt-4">
            <h2>Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img 
                                src={`http://localhost/marketplace/images/${product.image}`} 
                                className="card-img-top" 
                                alt={product.name} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                                <button 
                                    onClick={() => addToCart(product)} 
                                    className="btn btn-primary"
                                >
                                    Add to Cart
                                </button>
                                <a href={`/product/${product.id}`} className="btn btn-info ml-2">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
