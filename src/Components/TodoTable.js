import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import "./table.css";
import { useNavigate } from "react-router-dom";
import DailyTodos from "./CategoryScreens/DailyTodos";
import { API_PATH } from '../Api/Api';

const TableView = ({
  data = null,
  editedData,
  setEditedData,
  handleUpdate,
  showEditModal,
  setShowEditModal,
  handleDeleteUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "Time", header: "Time" },
    { field: "Task", header: "Task" },
    { field: "completed", header: "Completed" },
  ];

  useEffect(() => {
    // Make a GET request to fetch categories from your API
    fetch(`${API_PATH}/categories`) // Adjust the API endpoint URL as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response;
      })
      .then((data) => {
        // Update the component state with the fetched categories
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {columns.map((head) => (
            <TableCell
              sx={{ backgroundColor: "white", fontWeight: "bold" }}
              key={head.field}
              className="tablecell"
            >
              <TableSortLabel
                active={sortColumn === head.field}
                direction={sortOrder}
                onClick={() => handleSortClick(head.field)}
              >
                {head.header}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableBody = () => {
    return (
      <TableBody>
        {categories.map((item) => (
          <DailyTodos key={item.id} CategoryId={item.id} />
        ))}
      </TableBody>
    );
  };

  return (
    <div>
      <Box className="Table-card">
        <TextField
          placeholder="Search"
          variant="standard"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px" }}
        />
        <TableContainer className="table-container">
          <Table stickyHeader>
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
        </TableContainer>
        {data ? null : <p>No data found</p>}
      </Box>
    </div>
  );
};

export default TableView;
