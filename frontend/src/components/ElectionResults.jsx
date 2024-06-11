import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';

const ElectionResults = () => {
  const [voteData, setVoteData] = useState({ Count: [], data: [] });
  const [resultadosData, setResultadosData] = useState({ data: [] });
  const [modal, setModal] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState('');

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.Id_Casilla) {
          throw new Error('No se encontró Id_Casilla en userData');
        }

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_API}/VotosPorCasilla/${userData.Id_Casilla}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setVoteData(data);
      } catch (error) {
        console.error('Error al obtener los datos de votos:', error);
        // Manejo de errores aquí
      }
    };
    fetchVoteData();
  }, []);

  const handleGeneratePDF = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'application/pdf';

      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          const base64Data = reader.result.split(',')[1]; // Extraer solo los datos base64

          const userData = JSON.parse(localStorage.getItem('userData'));
          if (!userData || !userData.Id_Casilla) {
            throw new Error('No se encontró Id_Casilla en userData');
          }

          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_API}/AgregarResultado`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Id_Casilla: userData.Id_Casilla,
              PDF: base64Data,
            }),
          });

          if (!response.ok) {
            throw new Error('Error al enviar el PDF al servidor');
          }

          alert('PDF enviado correctamente.');
        };
      };

      fileInput.click();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      // Manejo de errores aquí
    }
  };

  const toggleModal = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.Id_Casilla) {
        throw new Error('No se encontró Id_Casilla en userData');
      }

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_API}/resultados/${userData.Id_Casilla}`);
      if (!response.ok) {
        throw new Error('Error al obtener los resultados');
      }

      const data = await response.json();
      setResultadosData(data);
      setModal(!modal);
    } catch (error) {
      console.error('Error al obtener los resultados:', error);
      // Manejo de errores aquí
    }
  };

  const handleViewPDF = (pdfBase64) => {
    setSelectedPDF(pdfBase64);
    setModal(true);
  };

  const handleDownloadPDF = (pdfBase64) => {
    try {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = 'resultado.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      // Manejo de errores aquí, por ejemplo, mostrar un mensaje al usuario
    }
  };
  return (
    <div className="container mt-5">
      <Row className="g-0 bg-dark text-white p-4">
        <Col>
          <h1 className="text-center">Funcionario</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="shadow">
            <CardHeader>
              <CardTitle tag="h2" className="text-center">Resultados Electorales de casilla</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voteData.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Candidato}</td>
                        <td>{item.Fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row text-right mt-4">
                <div className='col'>
                <Button color="primary" className="d-flex align-items-center m-1" onClick={handleGeneratePDF}>
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Generar PDF
                </Button>
                </div>
                <div className='col'>
                <Button color="info" className="d-flex align-items-center m-1" onClick={toggleModal}>
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  Ver Resultados
                </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Row className="mt-4 mt-md-0">
            {voteData.Count.map((item, index) => (
              <Col key={index}>
                <Card className="shadow">
                  <CardBody>
                    <CardTitle tag="h3" className="text-center">{item.nombre}</CardTitle>
                    <CardText className="text-center text-muted">{item.partido}</CardText>
                    <div className="text-center text-primary display-4 mb-3">{item.total}</div>
                    <CardText className="text-center text-muted">Votos Totales</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal para visualizar PDF */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Resultados</ModalHeader>
        <ModalBody>
          <Row>
            {resultadosData.data.map((item, index) => (
              <Col key={index}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{item.date}</CardTitle>
                    <CardText>Total Votos: {item.totalVotos}</CardText>
                    <div className="text-center mb-3">
                      <button className='btn btn-warning m-1' onClick={() => handleDownloadPDF(item.PDF)}>
                        Descargar PDF
                      </button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ElectionResults;
