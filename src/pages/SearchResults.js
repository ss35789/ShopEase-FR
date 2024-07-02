import React from 'react';
import { useLocation } from 'react-router-dom';

const products = [
    // 예시 상품 데이터
    { id: 1, name: 'Fancy Product', description: 'A very fancy product', price: '$40.00 - $80.00' },
    { id: 2, name: 'Special Item', description: 'This item is on sale', price: '$18.00', originalPrice: '$20.00' },
    { id: 3, name: 'Sale Item', description: 'Buy this item on sale', price: '$25.00', originalPrice: '$50.00' },
    { id: 4, name: 'Popular Item', description: 'This item is very popular', price: '$40.00' },
    // 더 많은 상품 데이터를 추가하세요
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
