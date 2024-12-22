import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart'; // Импортируем новый компонент
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<ProductList />} /> {/* Главная страница с товарами */}
                    <Route path="/products" element={<ProductList />} /> {/* Путь для продуктов */}
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} /> {/* Роут для корзины */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
