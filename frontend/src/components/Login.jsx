import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    console.log('Usuario:', formData.username);
    console.log('Contraseña:', formData.password);
    // Aquí podrías enviar los datos a un servidor para autenticación o realizar la lógica necesaria
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md="6">
          <h2 className="text-center">Iniciar Sesión</h2>
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
            <Button color="primary" block onClick={onLogin}>Iniciar Sesión</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
