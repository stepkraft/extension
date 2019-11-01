import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { AiOutlineClose } from "react-icons/ai";
import './App.css';

const buttons = [
  { id: 'rating', label: 'Rating' },
  { id: 'address', label: 'www address' },
  { id: 'bonuses', label: 'Bonuses' },
  { id: 'feedbacks', label: 'Feedbacks', disabled: true },
  { id: 'prices', label: 'Prices', disabled: true },
];

function App() {
  const [key, setKey] = useState('address');
  const [extended, setExtended] = useState(false);

  // const testStorage = () => {
  //   try {
  //     console.log('browser', global);
  //   } catch(e) {
  //     console.warn('no browser support', e);
  //   }
  // }
    

  return (
    <Tab.Container id="tabs-buttons" defaultActiveKey={key}>
      <Row>
        <Col xs='auto' sm={12} md={8} lg={7}>
          <Nav variant={!!extended ? 'tabs' : 'pills'} active={key}>
            {buttons.map(({ id, label, disabled }) =>
              <Nav.Item key={id}>
                <Nav.Link
                  active={key === id}
                  eventKey={id}
                  disabled={disabled}
                  onSelect={k => {
                    setKey(k);
                    setExtended(true);
                    // testStorage();
                  }}
                >{label}</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          {!!extended &&
            <section className="panel">
              <Tab.Content>
                {buttons.filter(({disabled}) => !disabled ).map(({ id, label }) =>
                  <Tab.Pane key={id} eventKey={id}>
                    <Row className="panel-heading">
                      <h2 className="col">{label}</h2>
                      <span className="col flex-grow-0">
                        <Button variant="link" onClick={e => setExtended(false)}><AiOutlineClose /></Button>
                      </span>
                    </Row>
                    <p>{`content for ${id} will be soon`}</p>
                  </Tab.Pane>
                )}
              </Tab.Content>
            </section>
          }
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default App;
