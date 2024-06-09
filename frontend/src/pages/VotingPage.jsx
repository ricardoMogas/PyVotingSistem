import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VotingSection from '../components/VotingSection';
import CardVerificar from '../components/CardVerificar';

const VotingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleVoting = () => {
    // Aquí podrías realizar la lógica de autenticación (por ejemplo, verificar credenciales)
    // En este ejemplo simple, simplemente establecemos isLoggedIn en true
    setIsLoggedIn(true);
  };

  const handleOutVoting = () => {
    // Aquí podrías realizar la lógica de autenticación (por ejemplo, verificar credenciales)
    // En este ejemplo simple, simplemente establecemos isLoggedIn en false
    setIsLoggedIn(false);
  }

  return (
    <div className="container">
      {/* Mostrar CardVerification si el usuario no está autenticado */}
      {!isLoggedIn && <CardVerificar onVoting={handleVoting} />}

      {/* Mostrar VotingSection si el usuario está autenticado */}
      {isLoggedIn && <VotingSection event={handleOutVoting} />}
    </div>
  );
};

export default VotingPage;
