import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 50px;
`;

const ImgPreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  display: block;
  margin-top: 10px;
`;

function AddProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [img, setImg] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(file);
        }
    };

    const handleRemoveImage = () => {
        setImg(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const itemDTO = {
            name,
            price,
            salePrice,
        };
        formData.append('itemDTO', new Blob([JSON.stringify(itemDTO)], { type: 'application/json' }));
        if (img) {
            formData.append('img', img);
        }

        try {
            await axios.post('/api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <Container className="container">
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
                    <label htmlFor="img" className="form-label">Image</label>
                    <input type="file" className="form-control" id="img" onChange={handleImageUpload} />
                    {img && (
                        <div>
                            <ImgPreview src={URL.createObjectURL(img)} alt="Preview" />
                            <RemoveButton type="button" className="btn btn-danger" onClick={handleRemoveImage}>Remove Image</RemoveButton>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </Container>
    );
}

export default AddProduct;
