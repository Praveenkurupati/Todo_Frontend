import React from 'react';
import { Form,Col } from "react-bootstrap";
import CheveronIcon from "../icons/fi_chevron-down.png";

const DropdownField = ({
  label,
  name,
  value,
  options,
  onChange,
  required,
  colSize,
  feedbackMessage,
  validated
}) => {
  return (
    <Col lg={colSize} xl={colSize} md={colSize} sm={colSize} xs={12} xxs={'auto'}>
      <Form.Group className="mb-4">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Select
          as="select"
          name={name}
          className="dropdown"
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">{`Select ${name || 'Option'}*`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <img src={CheveronIcon} className="chevron-icon" />
        {validated && feedbackMessage && (
          <Form.Control.Feedback type="invalid">
            {feedbackMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Col>
  );
};

export default DropdownField;
