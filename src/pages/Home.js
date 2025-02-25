import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  margin-top: 5rem;
`;

const Header = styled.header`
  background-color: #343a40;
  padding: 5rem 0;
  color: white;
  text-align: center;
`;

const Section = styled.section`
  padding: 5rem 0;
`;

const Card = styled.div`
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  max-height: 150px;
  object-fit: cover;
`;

const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScroll;
    const hue = scrollFraction * 30;
    document.body.style.backgroundColor = `hsl(${hue}, 20%, 95%)`;
};

function Home() {
    const { handleAddToCart, handleRemoveFromCart, isInCart, items, setItems } = useOutletContext();
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setItems]);

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
    };

    const confirmDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                await axios.delete(`/api/items/${selectedProduct.itemKey}`);
                setItems((prevItems) => prevItems.filter(item => item.itemKey !== selectedProduct.itemKey));
                setSelectedProduct(null);
            } catch (error) {
                console.error('There was an error deleting the product!', error);
            }
        }
    };

    return (
        <Container>
            <Header>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop the Latest Trends</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Discover our exclusive collection of top-notch products</p>
                    </div>
                </div>
            </Header>
            <Section>
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {items.map(product => (
                            <div className="col mb-5" key={product.itemKey}>
                                <Card className="card h-100">
                                    {product.itemKey % 2 === 1 && (
                                        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                                    )}
                                    <CardImage className="card-img-top" src={product.img || 'https://via.placeholder.com/450x300/000/fff?text=No+Image'} alt={product.name} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.name}</h5>
                                            {product.salePrice ? (
                                                <>
                                                    <span className="text-muted text-decoration-line-through">₩{product.price.toLocaleString()}</span>
                                                    <span> ₩{product.salePrice.toLocaleString()}</span>
                                                </>
                                            ) : (
                                                <span>₩{product.price.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="d-flex justify-content-center">
                                            <Link
                                                className="btn btn-outline-dark mt-auto me-2"
                                                to={`/product/${product.itemKey}`}
                                                state={{ product }}
                                            >
                                                View Options
                                            </Link>
                                            <button
                                                className={`btn ${isInCart(product.itemKey) ? 'btn-success' : 'btn-outline-dark'} mt-auto`}
                                                onClick={() => isInCart(product.itemKey) ? handleRemoveFromCart(product) : handleAddToCart(product)}
                                            >
                                                {isInCart(product.itemKey) ? 'Already in Cart' : 'Add to Cart'}
                                            </button>
                                            {user?.role === 'ROLE_ADMIN' && (
                                                <button
                                                    className="btn btn-danger mt-auto ms-2"
                                                    onClick={() => handleDeleteProduct(product)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {selectedProduct && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete the product <strong>{selectedProduct.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDeleteProduct}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default Home;
