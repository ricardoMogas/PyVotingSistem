import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardVerificar = ({onVoting}) => {
  const [electoralKey, setElectoralKey] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setElectoralKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (electoralKey.trim() !== '') {
      // Lógica para permitir el acceso (redireccionar a otra página, mostrar contenido, etc.)
      console.log('Clave válida, acceso permitido');
    } else {
      setError(true);
    }
  };

  return (
    <Card>
      <CardBody>
        <h5 className="card-title text-center">Ingresa tu Clave Electoral</h5>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="electoralKeyInput">Clave Electoral</Label>
            <Input
              type="text"
              id="electoralKeyInput"
              placeholder="Ingresa tu clave electoral"
              value={electoralKey}
              onChange={handleInputChange}
            />
          </FormGroup>
          {error && <Alert color="danger">La clave electoral no puede estar vacía.</Alert>}
          <Button color="primary" type="submit" block onClick={onVoting}>Ingresar</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CardVerificar;
