import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';
import ElectionResults from '../components/ElectionResults'; // Importamos ElectionResults

const OfficialPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {/* Mostrar CardVerification si el usuario no está autenticado */}
      {!isLoggedIn && <Login onLogin={handleLogin} />}

      {/* Mostrar ElectionResults si el usuario está autenticado */}
      {isLoggedIn && <ElectionResults />}
    </div>
  );
};

export default OfficialPage;
