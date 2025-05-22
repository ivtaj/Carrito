// File: src/App.js
import React, { useReducer, useEffect, useState, useRef } from 'react';
import CartContext from './context/CartContext';
import './App.css'; // Importa tus estilos globales si los tienes
// import MyRoutes from './routes/MyRoutes'; // Comenta o elimina si no usas react-router-dom
import Toast from './components/Toast';
import ProductList from './components/ProductList'; // Importar ProductList
import Carrito from './components/Carrito';     // Importar Carrito

// Datos de productos de ejemplo (puedes mover esto a un archivo de datos si prefieres)
const dummyProducts = [
  { id: 1, name: 'Camiseta React', price: 25.99, image: 'https://via.placeholder.com/150?text=Camiseta' },
  { id: 2, name: 'Taza Context API', price: 15.50, image: 'https://via.placeholder.com/150?text=Taza' },
  { id: 3, name: 'Pegatina Reducer', price: 5.00, image: 'https://via.placeholder.com/150?text=Pegatina' },
  { id: 4, name: 'Gorra Hooks', price: 19.95, image: 'https://via.placeholder.com/150?text=Gorra' },
];


// Reducer para gestionar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_PRODUCTO': {
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex > -1) {
        const newState = [...state];
        newState[existingProductIndex].quantity += action.payload.quantity || 1;
        return newState;
      } else {
        return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
    }

    case 'ELIMINAR_PRODUCTO':
      return state.filter(item => item.id !== action.payload.id);

    // ... otros casos como ACTUALIZAR_CANTIDAD, LIMPIAR_CARRITO si los tienes ...

    default:
      return state;
  }
};

// Componente Provider del carrito
const CartProvider = ({ children }) => {
  const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Estado para el Toast
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimeoutRef = useRef(null); // Ref para guardar el ID del timeout

  // Función para mostrar el toast
  const showToast = (message) => {
    // Limpiar timeout anterior si existe
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // Mostrar el toast
    setToast({ message, visible: true });

    // Ocultar el toast después de 3 segundos
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prevToast => ({ ...prevToast, visible: false })); // Solo ocultar, mantener el mensaje brevemente para la animación de salida
    }, 3000); // 3000 ms = 3 segundos
  };

  // Efecto para guardar el estado del carrito en LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  // Efecto de limpieza para el timeout del toast
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []); // Se ejecuta solo al montar y desmontar

  // Funciones helper que usan dispatch Y showToast
  const addToCart = (product) => {
    dispatch({ type: 'AGREGAR_PRODUCTO', payload: product });
    showToast(`${product.name} añadido al carrito.`);
  };

  const removeFromCart = (productId) => {
    // Opcional: encontrar el nombre del producto antes de eliminar para el mensaje
    const productToRemove = cartState.find(item => item.id === productId);
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: { id: productId } });
    if (productToRemove) {
        showToast(`${productToRemove.name} eliminado del carrito.`);
    } else {
        showToast('Producto eliminado del carrito.');
    }
  };

  // El valor del contexto ahora incluye las funciones helper
  const contextValue = {
    cartState,
    // Pasamos las funciones helper en lugar de dispatch directamente
    addToCart,
    removeFromCart,
    // Si necesitas dispatch para otras acciones no relacionadas con toast, puedes pasarlo también
    // dispatch,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      {/* Renderizar el Toast aquí dentro del provider o en App */}
      {/* Renderizarlo aquí asegura que tenga acceso al estado 'toast' */}
      <Toast message={toast.message} isVisible={toast.visible} />
    </CartContext.Provider>
  );
};

function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>Tienda de Productos</h1>
        {/* Contenedor para la lista de productos y el carrito */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', flexWrap: 'wrap' }}>
          {/* Renderiza la lista de productos */}
          <ProductList products={dummyProducts} />

          {/* Renderiza el carrito */}
          <Carrito />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
