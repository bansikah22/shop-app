// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price: parseFloat(price) });
        setName('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Save</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        margin: '5px',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        width: '200px',
    },
    button: {
        margin: '5px',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0056b3',
        color: 'white',
        cursor: 'pointer',
    },
};

export default ProductForm;
