import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태를 확인하는 로직을 추가할 수 있습니다.
        // 예를 들어, 로컬 스토리지나 쿠키에서 토큰을 확인하는 로직.
        // fetch('/api/auth/status')
        //     .then(response => response.json())
        //     .then(data => setIsLoggedIn(data.isLoggedIn))
        //     .catch(error => console.error('Error:', error));
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // 로컬 스토리지나 쿠키에서 토큰을 삭제하는 로직을 추가할 수 있습니다.
        // fetch('/api/auth/logout', { method: 'POST' })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error('Error:', error));
    };

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/">Start Bootstrap</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex mx-auto" style={{ flex: 1, maxWidth: '700px' }} onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control me-2 search-input"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                            <button className="btn search-button" type="submit">
                                <i className="bi-search"></i>
                            </button>
                        </form>
                        <button className="btn btn-outline-dark ms-3" type="button" onClick={() => navigate('/cart')}>
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItemCount}</span>
                        </button>
                        {isLoggedIn ? (
                            <div className="d-flex align-items-center ms-3">
                                <img
                                    src="https://dummyimage.com/40x40/000/fff"
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ marginRight: '10px' }}
                                />
                                <span>Username</span>
                                <button className="btn btn-link" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-outline-dark ms-3">Login</Link>
                        )}
                    </div>
                </div>
            </nav>
            <Outlet context={{ cartItems, handleAddToCart, setCartItems }} />
        </div>
    );
}

export default App;
