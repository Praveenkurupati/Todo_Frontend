import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessPopup = ({ show, onClose, timeout = null }) => {
  useEffect(() => {
    if (show && timeout) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, onClose, timeout]);

  return (
    <Modal show={show} onHide={onClose} size="sm" centered style={{ fontSize: "1rem", color: "green", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Modal.Body>
        <center><p>Successfully updated!</p></center>
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

export default SuccessPopup;
