// File: src/components/ProductList.jsx
import React from 'react';
import Producto from './Producto'; // Asegúrate de la ruta correcta
// import './ProductList.css'; // Opcional: importa tus estilos

const ProductList = ({ products }) => {
  // Estilos básicos en línea para el ejemplo
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  return (
    <div>
      <h2>Productos Disponibles</h2>
      <div style={listStyle}>
        {products.map(product => (
          <Producto key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
