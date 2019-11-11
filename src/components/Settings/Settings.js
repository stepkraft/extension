import React from 'react';
import { bool, func } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './Settings.css';

const Settings = ({show, close, save, ...props}) => {
    return (
        <Modal show={show} onHide={close} {...props} dialogClassName="settings-modal" backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">vertical position</Form.Label>
                        <Col sm="8">
                            <ToggleButtonGroup
                                type="radio"
                                name="verticalPosition"
                                value={props.data.verticalPosition}
                                onChange={(ev) => save({verticalPosition: ev})}
                            >
                                <ToggleButton value="top">top</ToggleButton>
                                <ToggleButton value="bottom">bottom</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">horizontal position</Form.Label>
                        <Col sm="8">
                            <ToggleButtonGroup
                                type="radio"
                                name="horizontalPosition"
                                value={props.data.horizontalPosition}
                                onChange={(ev) => save({horizontalPosition: ev})}
                            >
                                <ToggleButton value="left">left</ToggleButton>
                                <ToggleButton value="right">right</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

Settings.propTypes = {
    show: bool.isRequired,
    close: func.isRequired,
    save: func.isRequired,
};

export default Settings;