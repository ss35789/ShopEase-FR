import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import SearchResults from './pages/SearchResults';
import Login from './pages/LoginAbout/Login';
import SignUp from './pages/LoginAbout/SignUp';
import ForgotID from './pages/LoginAbout/ForgotID';
import Cart from "./pages/Cart";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="user" element={<UserProfile />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="forgot-id" element={<ForgotID />} />
                    <Route path="cart" element={<Cart />} /> {/* Cart 경로 추가 */}
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;
