import React, { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";

function Form({ onAddForm }) {
  const [formData, setFormData] = useState({
    rollNo: "",
    email: "",
    semester: "",
    courses: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddForm(formData);
    setFormData({
      rollNo: "",
      email: "",
      semester: "",
      courses: "",
      role: "student",
    });
  };

  return (
    <Paper
      style={{
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        height: "450px",
        background:
          "linear-gradient(to right, rgba(79, 172, 254, 0.5), rgba(0, 242, 254, 0.5))",
      }}
    >
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          label="Roll No"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          label="Semester"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          name="courses"
          value={formData.courses}
          onChange={handleChange}
          label="Courses"
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
