import React from 'react';
import styled from 'styled-components';
import { Link, useOutletContext } from 'react-router-dom';

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

function Cart() {
    const { cartItems, setCartItems } = useOutletContext();

    const handleRemove = (itemKey) => {
        const updatedCart = cartItems.filter(product => product.itemKey !== itemKey);
        setCartItems(updatedCart);
    };

    const handleQuantityChange = (itemKey, quantity) => {
        setCartItems(cartItems.map(item =>
            item.itemKey === itemKey ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
        ));
    };

    const totalOriginalPrice = cartItems.reduce((total, product) => total + product.originalPrice * product.quantity, 0);
    const totalPrice = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalSavings = totalOriginalPrice - totalPrice;

    return (
        <CartContainer className="container">
            <CartHeader>
                <h1 className="display-4 fw-bolder">Shopping Cart</h1>
                <p className="lead fw-normal text-white-50 mb-0">Review your selected items</p>
            </CartHeader>
            <div className="mt-5">
                {cartItems.map(product => (
                    <CartItem key={product.itemKey} className="row">
                        <div className="col-md-2">
                            <img src={product.img} alt={product.name} className="img-fluid" />
                        </div>
                        <div className="col-md-4">
                            <h5>{product.name}</h5>
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary me-2" onClick={() => handleQuantityChange(product.itemKey, -1)}>-</button>
                                <span>{product.quantity}</span>
                                <button className="btn btn-outline-secondary ms-2" onClick={() => handleQuantityChange(product.itemKey, 1)}>+</button>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <p>₩{product.price.toLocaleString()}</p>
                            {product.price < product.originalPrice && (
                                <p className="text-muted text-decoration-line-through">₩{product.originalPrice.toLocaleString()}</p>
                            )}
                        </div>
                        <div className="col-md-2 text-end">
                            <button className="btn btn-outline-danger" onClick={() => handleRemove(product.itemKey)}>Remove</button>
                        </div>
                    </CartItem>
                ))}
                <CartSummary>
                    <h5>Total Price: ₩{totalPrice.toLocaleString()}</h5>
                    <h6 className="text-muted">You saved: ₩{totalSavings.toLocaleString()}</h6>
                </CartSummary>
                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                    <button className="btn btn-success ms-3" onClick={() => {
                        // 결제 처리 로직
                        // 결제 정보를 서버로 전송
                    }}>Checkout</button>
                </div>
            </div>
        </CartContainer>
    );
}

export default Cart;
