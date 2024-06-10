import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_BASE_API + '/Login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();

      // Verificar el rol obtenido
      if (data.data.rol === 0) {
        alert('Cuenta con un rol incorrecto para iniciar sesión.');
        return; // Salir de la función sin hacer más acciones
      }

      // Guardar datos en localStorage
      localStorage.setItem('userData', JSON.stringify(data.data));

      // Llamar a la función onLogin si es necesario
      if (typeof onLogin === 'function') {
        onLogin();
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      // Manejo de errores aquí
    }
  };

  return (
    <Card className="p-4">
      <CardTitle tag="h4">Iniciar Sesión</CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="usernameInput">Usuario</Label>
            <Input
              type="text"
              id="usernameInput"
              name="username"
              placeholder="Ingresa tu usuario"
              value={formData.username}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordInput">Contraseña</Label>
            <Input
              type="password"
              id="passwordInput"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color="primary" block type="submit">Iniciar Sesión</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
