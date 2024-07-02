import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
    margin-top: 5rem;
`;

const CartHeader = styled.header`
    background-color: #343a40;
    padding: 2rem 0;
    color: white;
    text-align: center;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
`;

const CartSummary = styled.div`
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 5px;
    text-align: right;
`;

const productsInCart = [
    { id: 1, name: 'Classic Watch', originalPrice: 170000, price: 150000, quantity: 1, image: 'https://via.placeholder.com/450x300/000/fff?text=Classic+Watch' },
    { id: 2, name: 'Leather Boots', originalPrice: 140000, price: 120000, quantity: 2, image: 'https://via.placeholder.com/450x300/000/fff?text=Leather+Boots' },
    { id: 3, name: 'Elegant Dress', originalPrice: 100000, price: 80000, quantity: 1, image: 'https://via.placeholder.com/450x300/000/fff?text=Elegant+Dress' },
];

function Cart() {
    const totalOriginalPrice = productsInCart.reduce((total, product) => total + product.originalPrice * product.quantity, 0);
    const totalPrice = productsInCart.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalSavings = totalOriginalPrice - totalPrice;

    return (
        <CartContainer className="container">
            <CartHeader>
                <h1 className="display-4 fw-bolder">Shopping Cart</h1>
                <p className="lead fw-normal text-white-50 mb-0">Review your selected items</p>
            </CartHeader>
            <div className="mt-5">
                {productsInCart.map(product => (
                    <CartItem key={product.id} className="row">
                        <div className="col-md-2">
                            <img src={product.image} alt={product.name} className="img-fluid" />
                        </div>
                        <div className="col-md-4">
                            <h5>{product.name}</h5>
                        </div>
                        <div className="col-md-2">
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <div className="col-md-2">
                            <p>₩{product.price.toLocaleString()}</p>
                            {product.price < product.originalPrice && (
                                <p className="text-muted text-decoration-line-through">₩{product.originalPrice.toLocaleString()}</p>
                            )}
                        </div>
                        <div className="col-md-2 text-end">
                            <button className="btn btn-outline-danger">Remove</button>
                        </div>
                    </CartItem>
                ))}
                <CartSummary>
                    <h5>Total Price: ₩{totalPrice.toLocaleString()}</h5>
                    <h6 className="text-muted">You saved: ₩{totalSavings.toLocaleString()}</h6>
                </CartSummary>
                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                    <button className="btn btn-success ms-3">Checkout</button>
                </div>
            </div>
        </CartContainer>
    );
}

export default Cart;
