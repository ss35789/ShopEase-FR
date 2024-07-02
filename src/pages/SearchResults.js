import React from 'react';
import { useLocation } from 'react-router-dom';
import products from '../data/products';
import { highlight } from '../utils/highlight';

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
                                        <h5 className="fw-bolder">{highlight(product.name, query)}</h5>
                                        <p>{highlight(product.description, query)}</p>
                                        {product.originalPrice ? (
                                            <>
                                                <span className="text-muted text-decoration-line-through">₩{product.originalPrice.toLocaleString()}</span>
                                                <span> ₩{product.price.toLocaleString()}</span>
                                            </>
                                        ) : (
                                            <span>₩{product.price.toLocaleString()}</span>
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
