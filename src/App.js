import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import Form from "./components/form";
import FormList from "./components/FormList";
import "./App.css";

function App() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forms");
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addForm = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forms",
        formData
      );
      setForms([...forms, response.data]);
    } catch (error) {
      console.error("Error adding form:", error);
    }
  };

  const deleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      setForms(forms.filter((form) => form._id !== id));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const updateForm = async (id, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/forms/${id}`,
        formData
      );
      setForms(forms.map((form) => (form._id === id ? response.data : form)));
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <Container maxWidth="lg" className="App">
      <Typography variant="h3" gutterBottom className="app-title">
        Student Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Form onAddForm={addForm} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormList
            forms={forms}
            onDeleteForm={deleteForm}
            onUpdateForm={updateForm}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
