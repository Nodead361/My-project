import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost/marketplace/api/product.php?id=${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="btn btn-success">Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
