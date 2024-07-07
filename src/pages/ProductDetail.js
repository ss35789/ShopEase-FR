import React from 'react';
import { useParams, useOutletContext, useLocation } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const { handleAddToCart, handleRemoveFromCart, isInCart } = useOutletContext();
    const location = useLocation();
    const { product } = location.state || {
        product: {
            id: parseInt(id),
            name: `Product Name ${id}`,
            originalPrice: 50000,
            price: 45000,
            image: 'https://dummyimage.com/600x400/dee2e6/6c757d.jpg',
            description: 'This is a sample product description. This product has many great features and is available at an affordable price.'
        }
    };

    const inCart = isInCart(product.id);

    return (
        <div className="container px-4 px-lg-5 my-5">
            <div className="row">
                <div className="col-md-6">
                    <img className="img-fluid" src={product.image} alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <div className="d-flex mb-4">
                        <span className="h5">₩{product.price.toLocaleString()}</span>
                    </div>
                    <button
                        className={`btn ${inCart ? 'btn-success' : 'btn-outline-dark'} flex-shrink-0`}
                        type="button"
                        onClick={() => inCart ? handleRemoveFromCart(product) : handleAddToCart(product)}
                    >
                        <i className="bi-cart-fill me-1"></i>
                        {inCart ? 'Already in Cart' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
