import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Aquí podrías realizar la lógica de autenticación (por ejemplo, verificar credenciales)
    // En este ejemplo simple, simplemente establecemos isLoggedIn en true
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {/* Mostrar CardVerification si el usuario no está autenticado */}
      {!isLoggedIn && <Login onLogin={handleLogin} />}

      {/* Mostrar VotingSection si el usuario está autenticado */}
      {isLoggedIn && <h1>YYYYY</h1> }
    </div>
  );
};

export default AdminPage;