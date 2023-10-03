import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DropdownField from "../Fields/DropDownField";
import TextInputField from "../Fields/TextInputField";
import FutureDateField from "../Fields/FutureDateField";
import { API_PATH } from "../Api/Api";
import './CreateTodo.css'
import { token } from "../Auth/token";
import { fecthWithAuthPost } from "../Auth/dependencyPost";
import SuccessPopup from "../SuccessPopup";
import { ErrorPopup } from "../ErrorPopup";

const CreateTodo = () => {
  const validationRegexOnlyAlpha = /^(?![\s])^[a-zA-Z\s]*$/;

  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [completedByTime, setCompletedByTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [categories, setCategories] = useState([]);
  const [validated, setValidated] = useState(false);

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_PATH}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleHeadlineChange = (event) => {
    setHeadline(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCompletedByTimeChange = (date) => {
    setCompletedByTime(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formData = {
      categoryId:category,
      todoHeadline:headline,
      todoDescription:description,
      completedBy:completedByTime,
      userId:userId
    };

    try {
      const response = await fecthWithAuthPost(
        `${API_PATH}/todo`,
        "POST",
        token,
        formData
      );

      if (!response) {
        const errorData = await response;
        throw new Error(errorData);
        setShowErrorMessage(true)
      }
      setShowSuccessMessage(true);
      handleCancel()
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleCancel = () => {
    setCategory("");
    setHeadline("");
    setDescription("");
    setCompletedByTime(new Date().toISOString().split("T")[0]);
    setValidated(false);
  };

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      {/* <div  style={{ backgroundColor: "white" }}> */}
            <Form className="createTodo" noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="page-heading mt-2">Create Todo</div>
              <Row className="mt-4">
                <DropdownField
                  label="Category"
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  required={true}
                  colSize={4}
                />

                <TextInputField
                  label="Headline"
                  name="headline"
                  value={headline}
                  onChange={handleHeadlineChange}
                  type="text"
                  required={true}
                  maxLength={15}
                  colSize={4}
                  validationRegex={validationRegexOnlyAlpha}
                  validationErrorMessage="Please enter a valid name (max 25 characters)."
                />
                </Row>
                <Row className="mt-4">

                <TextInputField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  type="textarea"
                  maxLength={255}
                  colSize={4}
                  validationRegex={validationRegexOnlyAlpha}
                  validationErrorMessage="Please enter a valid name (max 25 characters)."
                />

                <FutureDateField
                  label="Completed By Time"
                  name="completedByTime"
                  value={completedByTime}
                  onChange={handleCompletedByTimeChange}
                  required={true}
                  colSize={4}
                />
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
            // onClick={handleClear}
          >
            Clear
          </button>
          <button className="save-button-figma-div" type="submit">
            Create Todo
          </button>
        </div>
        <SuccessPopup
              show={showSuccessMessage}
              onClose={() => setShowSuccessMessage(false)}
            />
            <ErrorPopup
              show={showErrorMessage}
              onClose={() => setShowErrorMessage(false)}
            />
            </Form>
      {/* </div> */}
    </Container>
  );
};

export default CreateTodo;
