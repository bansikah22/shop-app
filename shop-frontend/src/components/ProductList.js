// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                            <button onClick={() => onEdit(product)} style={styles.actionButton}>Edit</button>
                            <button onClick={() => onDelete(product.id)} style={styles.actionButton}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const styles = {
    table: {
        marginTop: '20px',
        borderCollapse: 'collapse',
        width: '80%',
        textAlign: 'left',
    },
    actionButton: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: '#0056b3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ProductList;
