import React from 'react';
import { Col, Form } from 'react-bootstrap';

const FutureDateField = ({
  label,
  name,
  value,
  onChange,
  required,
  colSize,
  feedbackMessage,
  validated
}) => {
  // Get the current date in ISO format (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Col lg={colSize} xl={colSize} md={colSize} sm={6} xs={12} xxs={'auto'}>
      <Form.Group className="mb-4">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          type="date"
          className="inputDate-figma"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          // Set the min attribute to the current date to restrict to future dates
          min={currentDate}
        />
        {validated && feedbackMessage && (
          <Form.Control.Feedback type="invalid">
            {feedbackMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Col>
  );
};

export default FutureDateField;
