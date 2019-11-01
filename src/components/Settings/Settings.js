import React from 'react';
import { bool, func } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Settings.css';

const Settings = ({show, close, ...props}) => {
    return (
        <Modal show={show} onHide={close} {...props} dialogClassName="settings-modal">
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={close}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

Settings.propTypes = {
    show: bool.isRequired,
    close: func.isRequired,
};

export default Settings;