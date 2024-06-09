import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function ElectionResults() {
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
              <CardTitle tag="h2" className="text-center">Resultados Electorales</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Distrito</th>
                      <th className="text-right">Partido A</th>
                      <th className="text-right">Partido B</th>
                      <th className="text-right">Partido C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Distrito 1</td>
                      <td className="text-right">1,234</td>
                      <td className="text-right">789</td>
                      <td className="text-right">456</td>
                    </tr>
                    <tr>
                      <td>Distrito 2</td>
                      <td className="text-right">2,345</td>
                      <td className="text-right">1,678</td>
                      <td className="text-right">987</td>
                    </tr>
                    <tr>
                      <td>Distrito 3</td>
                      <td className="text-right">3,456</td>
                      <td className="text-right">2,567</td>
                      <td className="text-right">1,678</td>
                    </tr>
                    <tr>
                      <td>Distrito 4</td>
                      <td className="text-right">4,567</td>
                      <td className="text-right">3,456</td>
                      <td className="text-right">2,345</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-right mt-4">
                <Button color="primary" className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Generar PDF
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Row className="mt-4 mt-md-0">
            <Col>
              <Card className="shadow">
                <CardBody>
                  <CardTitle tag="h3" className="text-center">Partido A</CardTitle>
                  <div className="text-center text-primary display-4 mb-3">12,602</div>
                  <CardText className="text-center text-muted">Votos Totales</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="shadow">
                <CardBody>
                  <CardTitle tag="h3" className="text-center">Partido B</CardTitle>
                  <div className="text-center text-primary display-4 mb-3">8,490</div>
                  <CardText className="text-center text-muted">Votos Totales</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="shadow">
                <CardBody>
                  <CardTitle tag="h3" className="text-center">Partido C</CardTitle>
                  <div className="text-center text-primary display-4 mb-3">5,466</div>
                  <CardText className="text-center text-muted">Votos Totales</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}