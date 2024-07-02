import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div className="col mb-5" key={index}>
                                <div className="card h-100">
                                    {index % 2 === 1 && (
                                        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                                    )}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">Product Name {index + 1}</h5>
                                            {index % 2 === 1 ? (
                                                <>
                                                    <span className="text-muted text-decoration-line-through">$20.00</span>
                                                    <span> $18.00</span>
                                                </>
                                            ) : (
                                                <span>$40.00 - $80.00</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <Link className="btn btn-outline-dark mt-auto" to={`/product/${index + 1}`}>View options</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
