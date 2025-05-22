// File: src/components/Carrito.jsx
import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // Asegúrate de que la ruta sea correcta
// import './Carrito.css'; // Opcional: importa tus estilos para el carrito

const Carrito = () => {
  // Usamos useContext para acceder al estado del carrito y a la función removeFromCart
  const { cartState, removeFromCart } = useContext(CartContext);

  // Función para manejar el clic en el botón "Eliminar"
  const handleRemoveFromCart = (productId) => {
    // Llamamos a la función helper del contexto
    removeFromCart(productId);
  };

  // Calcular el total del carrito
  const total = cartState.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // Estilos básicos en línea para el ejemplo
  const cartStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  };

  const listItemStyle = {
    borderBottom: '1px solid #eee',
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const itemImageStyle = {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '4px',
  };

  const itemDetailsStyle = {
      flexGrow: 1,
  };

  const removeButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  const totalStyle = {
      marginTop: '20px',
      borderTop: '1px solid #ccc',
      paddingTop: '15px',
      textAlign: 'right',
      fontSize: '1.2rem',
      fontWeight: 'bold',
  };


  return (
    <div style={cartStyle}>
      <h2>Carrito de Compras</h2>
      {cartState.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartState.map(item => (
              <li key={item.id} style={listItemStyle}>
                <img src={item.image} alt={item.name} style={itemImageStyle} />
                <div style={itemDetailsStyle}>
                  <h4>{item.name}</h4>
                  <p>Cant: {item.quantity} | Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={removeButtonStyle}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div style={totalStyle}>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
