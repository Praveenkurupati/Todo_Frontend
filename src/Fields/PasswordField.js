import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  required,
  colSize,
  feedbackMessage,
  validated,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Col lg={colSize} xl={colSize} md={colSize} sm={6} xs={12} xxs={'auto'}>
      <Form.Group className="mb-4 mt-4">
        <Form.Control
          className="input-figma"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          placeholder="Password*"
          type={passwordVisible ? 'text' : 'password'}
          maxLength={25}
          required={required}
          value={value || ''}
          onChange={onChange}
        />

        <span
          id="button-addon2"
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          {passwordVisible ? <VisibilityIcon /> : <VisibilityIconOff />}
        </span>

        <Form.Control.Feedback type="invalid">
          {feedbackMessage || 'Please enter a password.'}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};

export default PasswordInput;
