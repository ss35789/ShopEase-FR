import React from 'react';
import { useLocation } from 'react-router-dom';

const products = [
    { id: 1, name: 'Classic Watch', price: 150000, originalPrice: 170000, image: 'https://via.placeholder.com/450x300/000/fff?text=Classic+Watch', description: 'A timeless classic watch that combines elegance and functionality. Perfect for any occasion.' },
    { id: 2, name: 'Leather Boots', price: 120000, originalPrice: 140000, image: 'https://via.placeholder.com/450x300/000/fff?text=Leather+Boots', description: 'Durable and stylish leather boots that provide comfort and protection. Ideal for outdoor adventures.' },
    { id: 3, name: 'Elegant Dress', price: 80000, originalPrice: 100000, image: 'https://via.placeholder.com/450x300/000/fff?text=Elegant+Dress', description: 'An elegant dress that exudes sophistication and grace. Perfect for formal events and special occasions.' },
    { id: 4, name: 'Wireless Earbuds', price: 60000, originalPrice: 70000, image: 'https://via.placeholder.com/450x300/000/fff?text=Wireless+Earbuds', description: 'High-quality wireless earbuds with crystal clear sound and long battery life. Perfect for music lovers on the go.' },
    { id: 5, name: 'Sports Shoes', price: 90000, originalPrice: 100000, image: 'https://via.placeholder.com/450x300/000/fff?text=Sports+Shoes', description: 'Lightweight and comfortable sports shoes designed for optimal performance. Ideal for athletes and fitness enthusiasts.' },
    { id: 6, name: 'Backpack', price: 70000, originalPrice: 80000, image: 'https://via.placeholder.com/450x300/000/fff?text=Backpack', description: 'A versatile and durable backpack with multiple compartments. Perfect for travel and everyday use.' },
    { id: 7, name: 'Sunglasses', price: 50000, originalPrice: 60000, image: 'https://via.placeholder.com/450x300/000/fff?text=Sunglasses', description: 'Stylish sunglasses that provide UV protection and enhance your look. Perfect for sunny days.' },
    { id: 8, name: 'Perfume', price: 45000, originalPrice: 50000, image: 'https://via.placeholder.com/450x300/000/fff?text=Perfume', description: 'A delightful perfume with a captivating scent. Perfect for making a lasting impression.' },
];

function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query')?.toLowerCase() || '';

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    return (
        <div className="container px-4 px-lg-5 my-5">
            <h1>Search Results</h1>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div className="col mb-5" key={product.id}>
                            <div className="card h-100">
                                <img className="card-img-top" src={`https://dummyimage.com/450x300/dee2e6/6c757d.jpg&text=${product.name}`} alt={product.name} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{product.name}</h5>
                                        <p>{product.description}</p>
                                        {product.originalPrice ? (
                                            <>
                                                <span className="text-muted text-decoration-line-through">{product.originalPrice}</span>
                                                <span> {product.price}</span>
                                            </>
                                        ) : (
                                            <span>{product.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found matching "{query}".</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
