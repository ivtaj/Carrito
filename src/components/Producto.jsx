// File: src/components/Producto.jsx
import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // Asegúrate de que la ruta sea correcta
// import './Producto.css'; // Opcional: importa tus estilos para el producto

const Producto = ({ product }) => {
  // Usamos useContext para acceder a la función addToCart
  const { addToCart } = useContext(CartContext);

  // Función para manejar el clic en el botón "Añadir"
  const handleAddToCart = () => {
    // Llamamos a la función helper del contexto
    addToCart(product); // Pasamos el objeto completo del producto
    // El toast se dispara dentro de la función addToCart en el provider
  };

  // Estilos básicos en línea para el ejemplo
  const productStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    margin: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '1rem',
  };


  return (
    <div style={productStyle}>
      <img src={product.image} alt={product.name} style={imageStyle} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart} style={buttonStyle}>
        Añadir al Carrito
      </button>
    </div>
  );
};

export default Producto;
