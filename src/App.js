import React, { useState, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { AiOutlineClose, AiOutlineSetting } from "react-icons/ai";
import './App.css';
import Settings from './components/Settings';
import { useSettinngsStateWithLocalStorage } from './services';

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
  const [showSettings, setShowSettings] = useState(false);
  const [extSettings, setExtSettings] = useSettinngsStateWithLocalStorage();
    
  const settingsContainer = useRef(null);
  const handleClose = () => setShowSettings(false);
  const saveExtSettings = (obj) => setExtSettings({
    ...extSettings,
    ...obj,
  });


  return (
    <div className="ext-container" style={{
      ...(extSettings.verticalPosition === 'top' ? {top: 0} : {bottom: 0}),
      ...(extSettings.horizontalPosition === 'left' ? {left: 0} : {right: 0}),      
    }}>
      <Tab.Container id="tabs-buttons" defaultActiveKey={key}>
        <Row>
          <Col xs='auto' sm={12}>
            <div ref={settingsContainer}>
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
                <>
                  <section className="panel section-tab-panel" style={{minHeight: '400px'}}>
                    <Tab.Content>
                      {buttons.filter(({disabled}) => !disabled ).map(({ id, label }) =>
                        <Tab.Pane key={id} eventKey={id}>
                          <Row className="panel-heading">
                            <h2 className="col">{label}</h2>
                            <span className="col flex-grow-0">
                              <Button variant="link" onClick={() => setShowSettings(true)}><AiOutlineSetting /></Button>
                            </span>
                            <span className="col flex-grow-0">
                              <Button variant="link" onClick={() => setExtended(false)}><AiOutlineClose /></Button>
                            </span>
                          </Row>
                          <p>{`content for ${id} will be soon`}</p>
                        </Tab.Pane>
                      )}
                    </Tab.Content>
                  </section>
                  <Settings
                    show={showSettings}
                    close={handleClose}
                    container={settingsContainer.current}
                    data={extSettings}
                    save={saveExtSettings}
                  />
                </>
              }
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default App;
