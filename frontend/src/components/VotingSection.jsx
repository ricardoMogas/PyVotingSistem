import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VotingSection = ({event}) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVote = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleNullVote = () => {
    setSelectedCandidate(null);
  };

  const EnviarVotoFetch = () => {
    const url = import.meta.env.VITE_REACT_APP_BASE_API + '/votar';
    const electoralKey = localStorage.getItem('claveElec');
    const selectedState = localStorage.getItem('id_estado');
    const section = localStorage.getItem('seccion');
    const data = {
      claveElec: electoralKey,
      id_estado: selectedState,
      seccion: section,
      id_candPre: selectedCandidate,
    };
    const confirmVote = window.confirm(`¿Deseas votar por este candidato?`);
    if (confirmVote) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.status) {
          console.log('Voto enviado con éxito:', result.message);
          alert(result.message);
          event();
        } else {
          console.error('Error al enviar el voto:', result.message);
        }
      })
      .catch(error => {
        console.error('Error al enviar el voto:', error);
      });
    }
  };
  
  const ObtenerCandidatosFetch = async () => {
    const url = import.meta.env.VITE_REACT_APP_BASE_API + '/candidatos';
    try {
      const response = await fetch(url); // Asegúrate de que la URL sea correcta
      const data = await response.json();
      if (data.status) {
        setCandidates(data.data);
        console.log('Candidatos:', data.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    ObtenerCandidatosFetch();
  }, []);
  return (
    <Container fluid className="voting-page">
      <h1 className="text-center text-primary">Página Para Votar</h1>
      <p className="text-center" style={{ fontSize: '18px' }}>¡Bienvenido a nuestra página principal!</p>

      <Row className="justify-content-center">
        {candidates.map(candidate => (
          <Col md="4" key={candidate.Id_CandPre}>
            <Card className={`mb-4 ${selectedCandidate === candidate.Id_CandPre ? 'border-primary' : ''}`}>
              <CardImg top src={`data:image/jpeg;base64,${candidate.imagen}`} alt={`Foto de ${candidate.nombreComp}`} />
              <CardBody className="text-center">
                <CardImg top
                  src={`data:image/jpeg;base64,${candidate.imagenPart}`}
                  alt={`Foto de ${candidate.partido}`}
                  style={{ width: '80px', height: '80px' }}
                />
                <CardTitle tag="h5">{candidate.nombreComp}</CardTitle>
                <CardText>{candidate.descripcion}</CardText>
                <Button
                  outline
                  color="primary"
                  onClick={() => handleVote(candidate.Id_CandPre)}
                  disabled={selectedCandidate !== null && selectedCandidate !== candidate.Id_CandPre}
                >
                  Votar por {candidate.nombreComp}
                </Button>
              </CardBody>

            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button color="danger" className="mr-3 mb-3" onClick={handleNullVote}>Anular Voto</Button>
        <Button color="primary" className="ml-3 mb-3" onClick={EnviarVotoFetch}>Enviar Voto</Button>
      </div>
    </Container>
  );
};

export default VotingSection;
