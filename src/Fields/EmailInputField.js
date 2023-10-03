import React from 'react';
import { Col, Form } from 'react-bootstrap';

const EmailInputField = ({
  label,
  name,
  required,
  value,
  onChange,
  feedbackMessage,
  invalidEmailMessage,
  colSize,
  validated,
}) => {
  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onChange({ target: { name, value: inputValue } });
  };

  const emailValid = isValidEmail(value); // Check if the email is valid

  return (
    <Col lg={colSize} xl={colSize} md={colSize} sm={6} xs={12} xxs={'auto'}>
      <Form.Group className="mb-4">
        <Form.Control
          type="email"
          name={name}
          className="input-figma"
          required={required}
          value={value}
          placeholder='email*'
          onChange={handleInputChange}
          isInvalid={validated && !emailValid}
        />
        {validated && !emailValid && (
          <Form.Control.Feedback type="invalid">
            {invalidEmailMessage || 'Please enter a valid email address.'}
          </Form.Control.Feedback>
        )}
        {validated && emailValid && feedbackMessage && (
          <Form.Control.Feedback type="valid">
            {feedbackMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Col>
  );
};

export default EmailInputField;
