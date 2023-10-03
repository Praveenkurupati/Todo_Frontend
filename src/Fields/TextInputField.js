import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const TextInputField = ({
  label,
  name,
  required,
  value,
  type,
  onChange,
  placeholder,
  feedbackMessage,
  colSize,
  validated,
  validationRegex,
  maxLength,
  textType,
}) => {
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Check if the input exceeds maxLength
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.substring(0, maxLength);
    }

    const isValidInput = validationRegex.test(inputValue);

    if (isValidInput) {
      setError(null);
      onChange({ target: { name, value: inputValue } });
    } else {
      setError(
        `Please enter a valid ${name} ${textType} (max ${maxLength} ${textType})`
      );
    }
  };

  return (
    <Col lg={colSize} xl={colSize} md={colSize} sm={6} xs={12} xxs={"auto"}>
      <Form.Group className="mb-4">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          name={name}
          className="input-figma"
          required={required}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={handleInputChange}
          maxLength={maxLength}
          isInvalid={!!error}
        />
       <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
          {error ||
            (validated && !validationRegex.test(value) && feedbackMessage) ||
            (validated && value.length <= 0 && feedbackMessage)}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};

export default TextInputField;
