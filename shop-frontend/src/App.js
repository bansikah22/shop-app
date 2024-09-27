// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';

const App = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleCreateProduct = async (product) => {
        await createProduct(product);
        fetchProducts();
    };

    const handleUpdateProduct = async (product) => {
        await updateProduct(editingProduct.id, product);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Product Management</h1>
            <ProductForm
                onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                product={editingProduct}
            />
            <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#007BFF',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        minHeight: '100vh', // Ensures the container fills the screen
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: '20px',
    },
};

export default App;
