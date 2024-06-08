import React, { useState } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const VotingSection = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleNullVote = () => {
    setSelectedCandidate(null);
  };

  return (
    <Container fluid className="voting-page">
      <h1 className="text-center text-primary">Página Para Votar</h1>
      <p className="text-center" style={{ fontSize: '18px' }}>¡Bienvenido a nuestra página principal!</p>

      <Row className="justify-content-center">
        <Col md="4">
          <Card className={`mb-4 ${selectedCandidate === 'candidato1' ? 'border-primary' : ''}`}>
            <CardImg top src="partido1.png" alt="Logo Partido 1" />
            <CardImg top src="candidato1.jpg" className="candidate-img-top" alt="Foto Candidato 1" />
            <CardBody className="text-center">
              <CardTitle tag="h5">Candidato 1</CardTitle>
              <CardText>Partido 1</CardText>
              <CardText>Propuestas: Mejorar la economía, aumentar la seguridad, mejorar la educación.</CardText>
              <Button
                outline
                color="primary"
                onClick={() => handleVote('candidato1')}
                disabled={selectedCandidate !== null && selectedCandidate !== 'candidato1'}
              >
                Votar por Candidato 1
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card className={`mb-4 ${selectedCandidate === 'candidato2' ? 'border-primary' : ''}`}>
            <CardImg top src="partido2.png" alt="Logo Partido 2" />
            <CardImg top src="candidato2.jpg" className="candidate-img-top" alt="Foto Candidato 2" />
            <CardBody className="text-center">
              <CardTitle tag="h5">Candidato 2</CardTitle>
              <CardText>Partido 2</CardText>
              <CardText>Propuestas: Reducir impuestos, promover energías renovables, mejorar la salud pública.</CardText>
              <Button
                outline
                color="primary"
                onClick={() => handleVote('candidato2')}
                disabled={selectedCandidate !== null && selectedCandidate !== 'candidato2'}
              >
                Votar por Candidato 2
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card className={`mb-4 ${selectedCandidate === 'candidato3' ? 'border-primary' : ''}`}>
            <CardImg top src="partido3.png" alt="Logo Partido 3" />
            <CardImg top src="candidato3.jpg" className="candidate-img-top" alt="Foto Candidato 3" />
            <CardBody className="text-center">
              <CardTitle tag="h5">Candidato 3</CardTitle>
              <CardText>Partido 3</CardText>
              <CardText>Propuestas: Aumentar el salario mínimo, mejorar el transporte público, reducir la contaminación.</CardText>
              <Button
                outline
                color="primary"
                onClick={() => handleVote('candidato3')}
                disabled={selectedCandidate !== null && selectedCandidate !== 'candidato3'}
              >
                Votar por Candidato 3
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button color="danger" className="mr-3 mb-3" onClick={handleNullVote}>Anular Voto</Button>
        <Button color="primary" className="ml-3 mb-3">Enviar Voto</Button>
      </div>
    </Container>
  );
};

export default VotingSection;
