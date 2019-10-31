import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import './App.css';

const buttons = [
  { id: 'rating', label: 'Rating', disabled: true },
  { id: 'address', label: 'www address' },
  { id: 'bonuses', label: 'Bonuses' },
  { id: 'feedbacks', label: 'Feedbacks', disabled: true },
  { id: 'prices', label: 'Prices', disabled: true },
];

function App() {
  const [key, setKey] = useState('address');
  const [extended, setExtended] = useState(false);


  return (
    <Tab.Container id="tabs-buttons" defaultActiveKey={key}>
      <Row>
        <Col xs='auto' sm={12} md={8} lg={7}>
          <Nav variant={!!extended ? 'tabs' : 'pills'} active={key}>
            {buttons.map(({ id, label, disabled }) =>
              <Nav.Item>
                <Nav.Link
                  active={key === id}
                  eventKey={id}
                  disabled={disabled}
                  onSelect={k => {
                    setKey(k);
                    setExtended(true);
                  }}
                >{label}</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          {!!extended &&
            <Tab.Content>
              {buttons.filter(({disabled}) => !disabled ).map(({ id }) =>
                <Tab.Pane eventKey={id}>
                  <p>{`content for ${id} will be soon`}</p>
                </Tab.Pane>
              )}
            </Tab.Content>
          }
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default App;
