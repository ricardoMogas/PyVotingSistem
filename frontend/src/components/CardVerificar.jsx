import React, { useEffect, useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const CardVerificar = ({ onVoting }) => {
  const [estados, setEstados] = useState([]);
  const [electoralKey, setElectoralKey] = useState('');
  const [error, setError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [section, setSection] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleInputChange = (e) => {
    setElectoralKey(e.target.value);
  };

  const handleDropdownSelect = (state) => {
    setSelectedState(state);
  };

  const handleSectionInput = (e) => {
    setSection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (electoralKey.trim() !== '' && selectedState !== '' && section.trim() !== '') {
      // Lógica para permitir el acceso (redireccionar a otra página, mostrar contenido, etc.)
      console.log('Clave válida, acceso permitido');
    } else {
      setError(true);
    }
  };

  const VerificarVotanteFetch = async () => {
    if (electoralKey.trim() !== '' && selectedState !== '' && section.trim() !== '') {
      // Lógica para permitir el acceso (redireccionar a otra página, mostrar contenido, etc.)
      console.log('Clave válida, acceso permitido');
    } else {
      setError(true);
      return;
    }

    const url = import.meta.env.VITE_REACT_APP_BASE_API + '/ChecarVoto';
    const data = {
      claveElec: electoralKey,
      id_estado: selectedState,
      seccion: section
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Resultado:', result);

    if (!result.status) {
      localStorage.setItem('claveElec', electoralKey);
      localStorage.setItem('id_estado', selectedState);
      localStorage.setItem('seccion', section);
      onVoting();
    } else {
      alert('Ya votaste');
    }
  };

  const ObtenerEstadosFetch = async () => {
    const url = import.meta.env.VITE_REACT_APP_BASE_API + '/Estados';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setEstados(data.data);
        console.log('Estados:', data.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }
  useEffect(() => {
    ObtenerEstadosFetch();
  }, []);
  return (
    <Card>
      <CardBody>
        <h3 className="card-title text-center">Ingresa a votar</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="electoralKeyInput">Clave Electoral</Label>
            <Input
              type="text"
              id="electoralKeyInput"
              placeholder="Ingresa a votar"
              value={electoralKey}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="stateDropdown">Estado</Label>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="scroll-dropdown">
              <DropdownToggle caret>
                {selectedState ? selectedState : 'Selecciona un estado'}
              </DropdownToggle>
              <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {estados.map((estado, index) => (
                  <DropdownItem key={index} onClick={() => handleDropdownSelect(estado[0])}>
                    {estado[1]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup>
            <Label for="sectionInput">Sección</Label>
            <Input
              type="text" // Cambiado a type="number" para aceptar solo números
              inputMode="text" // Esta línea quita las flechas de incremento
              id="sectionInput"
              placeholder="Ingresa la sección"
              value={section}
              onChange={handleSectionInput}
            />
          </FormGroup>

          <Button color="primary" type="submit" block onClick={VerificarVotanteFetch}>Ingresar</Button>
          {error && <Alert color="danger">La clave electoral, estado o sección no puede estar vacía.</Alert>}
        </Form>
      </CardBody>
    </Card>
  );
};

export default CardVerificar;

