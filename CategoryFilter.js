import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/marketplace/api/categories.php')
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <div className="list-group">
            {categories.map(category => (
                <button key={category.id} className="list-group-item list-group-item-action" onClick={() => onCategorySelect(category.id)}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
