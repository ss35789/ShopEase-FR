import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function AddProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newProduct = {
                name,
                price: parseInt(price),
                salePrice: salePrice ? parseInt(salePrice) : null,
                img
            };
            await axios.post('/api/items', newProduct);
            navigate('/');
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="salePrice" className="form-label">Sale Price</label>
                    <input type="number" className="form-control" id="salePrice" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Image URL</label>
                    <input type="text" className="form-control" id="img" value={img} onChange={(e) => setImg(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
