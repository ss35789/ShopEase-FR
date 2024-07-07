import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import products from '../data/products'; // products 데이터를 가져옴

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
    const hue = scrollFraction * 30; // 색조 범위를 더욱 줄임
    document.body.style.backgroundColor = `hsl(${hue}, 20%, 95%)`; // 채도와 명도를 고정
};

function Home() {
    const { handleAddToCart, handleRemoveFromCart, isInCart } = useOutletContext();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                        {products.map(product => (
                            <div className="col mb-5" key={product.id}>
                                <Card className="card h-100">
                                    {product.id % 2 === 1 && (
                                        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                                    )}
                                    <CardImage className="card-img-top" src={product.image} alt={product.name} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.name}</h5>
                                            {product.id % 2 === 1 ? (
                                                <>
                                                    <span className="text-muted text-decoration-line-through">₩{product.originalPrice.toLocaleString()}</span>
                                                    <span> ₩{product.price.toLocaleString()}</span>
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
                                                to={`/product/${product.id}`}
                                                state={{ product }}
                                            >
                                                View Options
                                            </Link>
                                            <button
                                                className={`btn ${isInCart(product.id) ? 'btn-success' : 'btn-outline-dark'} mt-auto`}
                                                onClick={() => isInCart(product.id) ? handleRemoveFromCart(product) : handleAddToCart(product)}
                                            >
                                                {isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </Container>
    );
}

export default Home;
