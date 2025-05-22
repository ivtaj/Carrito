// File: src/components/Toast.jsx
import React from 'react'; // No necesitamos useEffect o useRef aquí
import styled, { keyframes } from 'styled-components';

// Definir animaciones con keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

// Styled component para el contenedor del toast
const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px; /* Posición en la parte inferior */
  right: 20px; /* Posición en la parte derecha */
  background-color: rgba(50, 50, 50, 0.9); /* Fondo semi-transparente oscuro */
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  min-width: 200px;
  text-align: center;

  /* Aplicar animaciones basadas en la prop 'isvisible' */
  animation: ${props => props.isvisible ? fadeIn : fadeOut} 0.5s ease-in-out forwards;
  /* 'forwards' mantiene el estado final de la animación */

  /* Ocultar completamente cuando no es visible para que no ocupe espacio ni sea clickeable */
  visibility: ${props => props.isvisible ? 'visible' : 'hidden'};
  pointer-events: ${props => props.isvisible ? 'auto' : 'none'};
`;

const Toast = ({ message, isVisible }) => {
  // Renderiza el ToastContainer solo si hay un mensaje o si está visible
  if (!message && !isVisible) return null;

  return (
    <ToastContainer isvisible={isVisible}>
      {message}
    </ToastContainer>
  );
};

export default Toast;
