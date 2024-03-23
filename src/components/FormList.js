import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function FormList({ forms, onDeleteForm, onUpdateForm, maxHeight }) {
  const [editingId, setEditingId] = useState(null);
  const [editedForm, setEditedForm] = useState({
    rollNo: "",
    email: "",
    semester: "",
    courses: [],
    role: "student",
  });

  const handleEdit = (form) => {
    setEditedForm(form);
    setEditingId(form._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedForm({ ...editedForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateForm(editingId, editedForm);
    setEditedForm({
      rollNo: "",
      email: "",
      semester: "",
      courses: [],
      role: "student",
    });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    onDeleteForm(id);
  };

  return (
    <Paper
      style={{
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        background:
          "linear-gradient(to right, rgba(79, 172, 254, 0.5), rgba(0, 242, 254, 0.5))",
        height: "450px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ color: "#000" }}>List Student</h2>
      <TableContainer
        component={Paper}
        style={{
          background: "transparent", // Set background to transparent
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form._id}>
                {editingId === form._id ? (
                  <>
                    <TableCell>
                      <input
                        type="text"
                        name="rollNo"
                        value={editedForm.rollNo}
                        onChange={handleChange}
                        placeholder="Roll No"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="email"
                        name="email"
                        value={editedForm.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="semester"
                        value={editedForm.semester}
                        onChange={handleChange}
                        placeholder="Semester"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="courses"
                        value={editedForm.courses}
                        onChange={handleChange}
                        placeholder="Courses"
                      />
                    </TableCell>
                    <TableCell>
                      <Button type="submit" onClick={handleSubmit}>
                        Update
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{form.rollNo}</TableCell>
                    <TableCell>{form.email}</TableCell>
                    <TableCell>{form.semester}</TableCell>
                    <TableCell>{form.courses.join(", ")}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(form._id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleEdit(form)}>Edit</Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FormList;
