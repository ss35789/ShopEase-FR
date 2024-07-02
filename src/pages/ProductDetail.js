import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();

    return (
        <div className="container px-4 px-lg-5 my-5">
            <div className="row">
                <div className="col-md-6">
                    <img className="img-fluid" src="https://dummyimage.com/600x400/dee2e6/6c757d.jpg" alt="Product" />
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder">Product Name {id}</h1>
                    <p className="lead">This is a detailed description of product {id}. It has many features and is available at a great price.</p>
                    <div className="d-flex">
                        <span className="h5">$40.00</span>
                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
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
