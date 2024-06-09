import React, { useState } from 'react';
import {
  Container, Row, Col, Nav, NavItem, NavLink, Card, CardBody, CardTitle, Table, Button, Input, FormGroup, Label, Form
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('officials');
  const [officials, setOfficials] = useState([
    { id: 1, name: 'John Doe', position: 'Poll Worker', phone: '555-1234', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', position: 'Poll Supervisor', phone: '555-5678', email: 'jane@example.com', active: true },
    { id: 3, name: 'Bob Johnson', position: 'Poll Clerk', phone: '555-9012', email: 'bob@example.com', active: false }
  ]);
  const [parties, setParties] = useState([
    { id: 1, name: 'Democratic Party', acronym: 'DP', logo: '/democratic-party-logo.png', active: true },
    { id: 2, name: 'Republican Party', acronym: 'RP', logo: '/republican-party-logo.png', active: true },
    { id: 3, name: 'Green Party', acronym: 'GP', logo: '/green-party-logo.png', active: false }
  ]);
  const [newOfficial, setNewOfficial] = useState({ name: '', position: '', phone: '', email: '' });
  const [newParty, setNewParty] = useState({ name: '', acronym: '', logo: '' });
  const [editingOfficial, setEditingOfficial] = useState(null);
  const [editingParty, setEditingParty] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCreateOfficial = () => {
    setOfficials([...officials, { ...newOfficial, id: officials.length + 1, active: true }]);
    setNewOfficial({ name: '', position: '', phone: '', email: '' });
  };

  const handleUpdateOfficial = () => {
    const updatedOfficials = officials.map((official) => (official.id === editingOfficial.id ? editingOfficial : official));
    setOfficials(updatedOfficials);
    setEditingOfficial(null);
  };

  const handleDeleteOfficial = (id) => {
    const updatedOfficials = officials.map((official) => (official.id === id ? { ...official, active: false } : official));
    setOfficials(updatedOfficials);
  };

  const handleCreateParty = () => {
    setParties([...parties, { ...newParty, id: parties.length + 1, active: true }]);
    setNewParty({ name: '', acronym: '', logo: '' });
  };

  const handleUpdateParty = () => {
    const updatedParties = parties.map((party) => (party.id === editingParty.id ? editingParty : party));
    setParties(updatedParties);
    setEditingParty(null);
  };

  const handleDeleteParty = (id) => {
    const updatedParties = parties.map((party) => (party.id === id ? { ...party, active: false } : party));
    setParties(updatedParties);
  };

  return (
    <Container fluid className="p-0">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Row className="g-0 bg-dark text-white p-4">
            <Col>
              <h1 className="text-center">Administrador</h1>
            </Col>
          </Row>
          <Row className="g-0">
            <Col xs="12" md="3" className="bg-secondary text-white p-4">
              <Nav vertical>
                <NavItem>
                  <NavLink href="#" active={activeTab === 'officials'} onClick={() => setActiveTab('officials')}
                    style={{ fontSize: '2em' }}
                    >Funcionarios</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" active={activeTab === 'parties'} onClick={() => setActiveTab('parties')}
                    style={{ fontSize: '2em' }}
                    >Partidos</NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col xs="12" md="9" className="p-4">
              {activeTab === 'officials' && (
                <Card>
                  <CardBody>
                    <CardTitle tag="h2">Funcionarios de casilla</CardTitle>
                    <h3>Agrega un nuevo funcionario</h3>
                    <Form form="">
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="name">Nombre</Label>
                            <Input type="text" id="name" value={newOfficial.name} onChange={(e) => setNewOfficial({ ...newOfficial, name: e.target.value })} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="position">Cargo</Label>
                            <Input type="text" id="position" value={newOfficial.position} onChange={(e) => setNewOfficial({ ...newOfficial, position: e.target.value })} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="phone">Teléfono</Label>
                            <Input type="tel" id="phone" value={newOfficial.phone} onChange={(e) => setNewOfficial({ ...newOfficial, phone: e.target.value })} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="email">Sección</Label>
                            <Input type="email" id="email" value={newOfficial.email} onChange={(e) => setNewOfficial({ ...newOfficial, email: e.target.value })} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" onClick={handleCreateOfficial}>Agregar</Button>
                    </Form>
                    <h3 className="mt-4">Funcionarios de casilla</h3>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cargo</th>
                          <th>Teléfono</th>
                          <th>Sección</th>
                          <th>Status</th>
                          <th>Acciones</th>
                        </tr>
                        </thead>
                      <tbody>
                        {officials.map((official) => (
                          <tr key={official.id} className={!official.active ? "text-muted" : ""}>
                            <td>{editingOfficial?.id === official.id ? (
                              <Input type="text" value={editingOfficial.name} onChange={(e) => setEditingOfficial({ ...editingOfficial, name: e.target.value })} />
                            ) : (
                              official.name
                            )}</td>
                            <td>{editingOfficial?.id === official.id ? (
                              <Input type="text" value={editingOfficial.position} onChange={(e) => setEditingOfficial({ ...editingOfficial, position: e.target.value })} />
                            ) : (
                              official.position
                            )}</td>
                            <td>{editingOfficial?.id === official.id ? (
                              <Input type="tel" value={editingOfficial.phone} onChange={(e) => setEditingOfficial({ ...editingOfficial, phone: e.target.value })} />
                            ) : (
                              official.phone
                            )}</td>
                            <td>{editingOfficial?.id === official.id ? (
                              <Input type="email" value={editingOfficial.email} onChange={(e) => setEditingOfficial({ ...editingOfficial, email: e.target.value })} />
                            ) : (
                              official.email
                            )}</td>
                            <td>{official.active ? 'Activo' : 'Inactivo'}</td>
                            <td>
                              {editingOfficial?.id === official.id ? (
                                <>
                                  <Button color="primary" onClick={handleUpdateOfficial} className="mr-2">Guardar</Button>
                                  <Button color="secondary" onClick={() => setEditingOfficial(null)}>Cancelar</Button>
                                </>
                              ) : (
                                <>
                                  <Button color="warning" onClick={() => setEditingOfficial(official)} className="mr-2">Editar</Button>
                                  <Button color="danger" onClick={() => handleDeleteOfficial(official.id)}>Eliminar</Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
              {activeTab === 'parties' && (
                <Card>
                  <CardBody>
                    <CardTitle tag="h2">Partidos políticos</CardTitle>
                    <h3>Agregar un nuevo partido</h3>
                    <Form form="">
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="name">Nombre</Label>
                            <Input type="text" id="name" value={newParty.name} onChange={(e) => setNewParty({ ...newParty, name: e.target.value })} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="acronym">Acronimo</Label>
                            <Input type="text" id="acronym" value={newParty.acronym} onChange={(e) => setNewParty({ ...newParty, acronym: e.target.value })} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="logo">Logo</Label>
                            <Input type="text" id="logo" value={newParty.logo} onChange={(e) => setNewParty({ ...newParty, logo: e.target.value })} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" onClick={handleCreateParty}>Agregar</Button>
                    </Form>
                    <h3 className="mt-4">Partidos políticos</h3>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Acronimo</th>
                          <th>Logo</th>
                          <th>Status</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parties.map((party) => (
                          <tr key={party.id} className={!party.active ? "text-muted" : ""}>
                            <td>{editingParty?.id === party.id ? (
                              <Input type="text" value={editingParty.name} onChange={(e) => setEditingParty({ ...editingParty, name: e.target.value })} />
                            ) : (
                              party.name
                            )}</td>
                            <td>{editingParty?.id === party.id ? (
                              <Input type="text" value={editingParty.acronym} onChange={(e) => setEditingParty({ ...editingParty, acronym: e.target.value })} />
                            ) : (
                              party.acronym
                            )}</td>
                            <td>{party.logo}</td>
                            <td>{party.active ? 'Activo' : 'Inactivo'}</td>
                            <td>
                              {editingParty?.id === party.id ? (
                                <>
                                  <Button color="primary" onClick={handleUpdateParty} className="mr-2">Guardar</Button>
                                  <Button color="secondary" onClick={() => setEditingParty(null)}>Cancelar</Button>
                                </>
                              ) : (
                                <>
                                  <Button color="warning" onClick={() => setEditingParty(party)} className="mr-2">Editar</Button>
                                  <Button color="danger" onClick={() => handleDeleteParty(party.id)}>Eliminar</Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminPage;

