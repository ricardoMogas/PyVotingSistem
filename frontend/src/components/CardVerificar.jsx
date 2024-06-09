import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardVerificar = ({ onVoting }) => {
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
          {error && <Alert color="danger">La clave electoral, estado o sección no puede estar vacía.</Alert>}
          
          <FormGroup>
            <Label for="stateDropdown">Estado</Label>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="scroll-dropdown">
              <DropdownToggle caret>
                {selectedState ? selectedState : 'Selecciona un estado'}
              </DropdownToggle>
              <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <DropdownItem onClick={() => handleDropdownSelect('Aguascalientes')}>Aguascalientes</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Baja California')}>Baja California</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Baja California Sur')}>Baja California Sur</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Campeche')}>Campeche</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Chiapas')}>Chiapas</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Chihuahua')}>Chihuahua</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Coahuila')}>Coahuila</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Colima')}>Colima</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Durango')}>Durango</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Estado de México')}>Estado de México</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Guanajuato')}>Guanajuato</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Guerrero')}>Guerrero</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Hidalgo')}>Hidalgo</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Jalisco')}>Jalisco</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Michoacán')}>Michoacán</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Morelos')}>Morelos</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Nayarit')}>Nayarit</DropdownItem>                <DropdownItem onClick={() => handleDropdownSelect('Nuevo León')}>Nuevo León</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Oaxaca')}>Oaxaca</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Puebla')}>Puebla</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Querétaro')}>Querétaro</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Quintana Roo')}>Quintana Roo</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('San Luis Potosi')}>San Luis Potosi</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Sinaloa')}>Sinaloa</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Sonora')}>Sonora</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Tabasco')}>Tabasco</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Tamaulipas')}>Tamaulipas</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Tlaxcala')}>Tlaxcala</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Veracruz')}>Veracruz</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Yucatán')}>Yucatán</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Zacatecas')}>Zacatecas</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          
          <FormGroup>
            <Label for="sectionInput">Sección</Label>
            <Input
              type="number" // Cambiado a type="number" para aceptar solo números
              inputMode="numeric" // Esta línea quita las flechas de incremento
              id="sectionInput"
              placeholder="Ingresa la sección"
              value={section}
              onChange={handleSectionInput}
            />
          </FormGroup>
          
          <Button color="primary" type="submit" block onClick={onVoting}>Ingresar</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CardVerificar;

