import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ErrorPopup = ({ show, onClose, errorMessage }) => {
  return (
    <Modal show={show} onHide={onClose} size="sm" centered style={{ fontSize: "1rem", color: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Modal.Body>
        <center><p>{errorMessage}</p></center>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <center>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </center>
      </Modal.Footer>
    </Modal>
  );
};


