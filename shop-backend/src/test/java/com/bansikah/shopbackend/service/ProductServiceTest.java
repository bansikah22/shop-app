package com.bansikah.shopbackend.service;

import com.bansikah.shopbackend.domain.Product;
import com.bansikah.shopbackend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product sampleProduct;

    @BeforeEach
    void setUp() {
        sampleProduct = new Product();
        sampleProduct.setId(1L);
        sampleProduct.setName("Sample Product");
        sampleProduct.setPrice(99.99);
    }

    @Test
    void testGetAllProducts() {
        // Arrange
        when(productRepository.findAll()).thenReturn(Arrays.asList(sampleProduct));

        // Act
        List<Product> products = productService.getAllProducts();

        // Assert
        assertEquals(1, products.size());
        assertEquals("Sample Product", products.get(0).getName());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testCreateProduct() {
        // Arrange
        when(productRepository.save(any(Product.class))).thenReturn(sampleProduct);

        // Act
        Product createdProduct = productService.createProduct(sampleProduct);

        // Assert
        assertNotNull(createdProduct);
        assertEquals("Sample Product", createdProduct.getName());
        verify(productRepository, times(1)).save(sampleProduct);
    }

    @Test
    void testGetProductById_Found() {
        // Arrange
        when(productRepository.findById(anyLong())).thenReturn(Optional.of(sampleProduct));

        // Act
        Optional<Product> product = productService.getProductById(1L);

        // Assert
        assertTrue(product.isPresent());
        assertEquals("Sample Product", product.get().getName());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testGetProductById_NotFound() {
        // Arrange
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act
        Optional<Product> product = productService.getProductById(1L);

        // Assert
        assertFalse(product.isPresent());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateProduct() {
        // Arrange
        Product updatedProduct = new Product();
        updatedProduct.setName("Updated Product");
        updatedProduct.setPrice(199.99);

        when(productRepository.findById(anyLong())).thenReturn(Optional.of(sampleProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        // Act
        Product result = productService.updateProduct(1L, updatedProduct);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Product", result.getName());
        assertEquals(199.99, result.getPrice());
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testUpdateProduct_NotFound() {
        // Arrange
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> productService.updateProduct(1L, sampleProduct));
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testDeleteProduct() {
        // Act
        productService.deleteProduct(1L);

        // Assert
        verify(productRepository, times(1)).deleteById(1L);
    }
}
