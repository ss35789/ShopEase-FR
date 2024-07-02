import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const { handleAddToCart } = useOutletContext();

    const product = {
        id: parseInt(id),
        name: `Product Name ${id}`,
        originalPrice: 50000,
        price: 45000,
        image: 'https://dummyimage.com/600x400/dee2e6/6c757d.jpg'
    };

    return (
        <div className="container px-4 px-lg-5 my-5">
            <div className="row">
                <div className="col-md-6">
                    <img className="img-fluid" src={product.image} alt="Product" />
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder">{product.name}</h1>
                    <p className="lead">This is a detailed description of {product.name}. It has many features and is available at a great price.</p>
                    <div className="d-flex">
                        <span className="h5">₩{product.price.toLocaleString()}</span>
                        <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => handleAddToCart(product)}>
                            <i className="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
