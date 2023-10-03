import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./TaskBar.css";
import { API_PATH } from "../../Api/Api";

const TaskBar = ({
  DateTime,
  Headline,
  rowId,
  isActive,
  description,
  CategoryId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(!isActive);
  const [showDescription, setShowDescription] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(Headline);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showEditModal, setShowEditModal] = useState(false);

  const formattedDate = new Date(DateTime).toLocaleDateString();
  const formattedTime = new Date(DateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const openEditModal = () => {
    setIsEditing(true);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleCheckboxChange = async () => {
    try {
      const response = await fetch(`${API_PATH}/todo/Active/${rowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isChecked }),
      });

      if (response.ok) {
        setIsChecked(!isChecked);
      } else {
        console.error("Failed to update isActive status");
      }
    } catch (error) {
      console.error("Error updating isActive status:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`${API_PATH}/todo/${rowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DateTime,
          todoHeadline: editedHeadline, // Use the editedHeadline state
          todoDescription:editedDescription
        }),
      });

      if (response.ok) {
        // Handle successful update, e.g., update UI or trigger a callback
        setIsEditing(false)

      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDescriptionToggle = () => {
    setShowDescription(!showDescription);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_PATH}/todo/${rowId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Handle successful deletion, e.g., update UI or trigger a callback
        console.log("Deleted");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const taskBarClassName = CategoryId > 0
    ? `task-bar-${CategoryId}`
    : 'task-bar';

  return (
    <div className={taskBarClassName}>
      <div className="task-bar-header" onClick={handleDescriptionToggle}>
        <div className="date">
          <p>{formattedDate}</p>
        </div>
        <div className="time">
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="task-bar-content">
        <div className="task-bar-headline" onClick={handleDescriptionToggle}>
          <h1>{Headline}</h1>
        </div>
        <div className="task-bar-checkbox">
          <input
            className={isChecked ? "filled-checkbox" : "empty-checkbox"}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        {showDescription && (
          <div className="task-bar-description" onClick={handleDescriptionToggle}>
            <>{description}</>
          </div>
        )}
        <div className="task-bar-edit-icon" onClick={openEditModal}>
          <EditIcon style={{ fontSize: "34px" }} />
        </div>
        <div className="task-bar-edit-icon" onClick={handleDelete}>
          <DeleteIcon style={{ fontSize: "34px" }} />
        </div>
      </div>
      {isEditing && (
        <Modal
          show={showEditModal}
          onHide={closeEditModal}
          className="modal"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-2">
              <Form.Group controlId="formHeadline">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  type="text"
                  value={editedHeadline}
                  onChange={(e) => setEditedHeadline(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </Form.Group>
              {/* Add more form fields as needed */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={closeEditModal}
              style={{
                color: "white",
                backgroundColor: "#b0aeac",
                fontSize: "12px",
                marginRight: "10px",
                borderRadius: "20px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{
                color: "white",
                backgroundColor: "#1976D2",
                fontSize: "12px",
                borderRadius: "20px",
              }}
              onClick={handleEdit}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TaskBar;
