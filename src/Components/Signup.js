import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import TextInputField from "../Fields/TextInputField";
import DropdownField from "../Fields/DropDownField";
import EmailInputField from "../Fields/EmailInputField";
import PasswordInput from "../Fields/PasswordField";
import TodoImage from "../icons/kerfin7_nea_2734 1.png";
import { fecthWithAuthPost } from "../Auth/dependencyPost";
import { API_PATH } from "../Api/Api";
import { token } from "../Auth/token";
import PastDateField from "../Fields/PastDateField"; // Import the PastDateField component
import PincodeField from "../Fields/PincodeField";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // State for dateOfBirth
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();


  const validationRegexOnlyAlpha = /^(?![\s])^[a-zA-Z\s]*$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      DateofBirth: dateOfBirth, // Use the date format in ISO (YYYY-MM-DD)
      password: password,
      confirmPassword: confirmedPassword,
    };
  
    try {
      const response = await fetch(`${API_PATH}/user`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        // Handle success, e.g., show a success message or redirect
        console.log("User registered successfully");
        navigate("/login"); // Redirect to the login page
      } else if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      handleClear();
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error:", error.message);
    }
  };
  

  const handleClear = (e) => {
    e.preventDefault();
    // Handle clearing the form fields here
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setGender("");
    setConfirmedPassword("");
    setDateOfBirth("")
    setMobileNumber("")
    setValidated(false);
  };

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      <Form
        className="SignUpForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="page-heading mt-2">
          <h1>Register</h1>
        </div>
        <Row>
          <Col md={6} className="Right-Half">
            <Row className="Fields-Form">
              <TextInputField
                name="firstname"
                textType="alphabets"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                colSize={4}
                placeholder="firstName*"
                validated={validated}
                feedbackMessage="Please enter a name."
                maxLength={25}
                validationRegex={validationRegexOnlyAlpha}
                validationErrorMessage="Please enter a valid name (max 25 characters)."
              />
              <TextInputField
                name="lastname"
                textType="alphabets"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                colSize={4}
                placeholder="lastName*"
                validated={validated}
                feedbackMessage="Please enter a name."
                maxLength={25}
                validationRegex={validationRegexOnlyAlpha}
                validationErrorMessage="Please enter a valid name (max 25 characters)."
              />
            </Row>
            <Row className="Fields-Form">
              <DropdownField
                name="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                feedbackMessage="Please select a gender."
                required
                colSize={6}
                validated={validated}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <PasswordInput
                label="Password"
                name="Password"
                required={true}
                colSize={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedbackMessage="Please enter a password."
                validated={validated}
              />
            </Row>
            <Row className="Fields-Form">
              <EmailInputField
                label="Email Address*"
                name="email"
                required={true}
                value={email}
                placeholder="Mobile Number*"
                onChange={(e) => setEmail(e.target.value)}
                validated={validated}
                invalidEmailMessage="Please enter a valid email address."
                colSize={6}
                feedbackMessage="Valid email address."
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                required={true}
                colSize={6}
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                feedbackMessage="Please confirm your password."
                validated={validated}
              />
            </Row>
            <Row className="Fields-Form">
              <PastDateField
                label="Date of Birth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required={true}
                colSize={6}
                validated={validated}
                feedbackMessage="Please enter a valid date of birth."
              />
              <PincodeField
                label="Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(event) => setMobileNumber(event.target.value)}
                required
                colSize={6}
                placeholder="Mobile Number*"
                validated={validated}
                feedbackMessage="Please enter a valid mobile number."
                validationRegex={/^[0-9]*$/}
                maxLength={10} // Set the maximum length as needed
                textType="mobile number" // Change this to the desired text type
              />
            </Row>
          </Col>
          <Col md={6} className="image-half">
            <img src={TodoImage} alt="Todo Image" className="user-image" />
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            direction: "unset",
          }}
        >
          <button
            className="clear-button-figma-div"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
          <button className="save-button-figma-div" type="submit">
            Register
          </button>
        </div>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </Form>
    </Container>
  );
};

export default SignupForm;
