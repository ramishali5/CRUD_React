const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-connection-string' with your actual MongoDB connection string)
mongoose.connect("mongodb://127.0.0.1:27017/Students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const FormSchema = new mongoose.Schema({
  rollNo: { type: String, unique: true },
  email: { type: String, unique: true },
  semester: String,
  courses: [String], // An array of strings to hold courses
  role: { type: String, enum: ["instructor", "student"], default: "student" },
});

const FormModel = mongoose.model("Form", FormSchema);

// API routes

// Create a new form entry
app.post("/api/forms", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const form = new FormModel(req.body);
    await form.save();
    console.log("New form entry saved:", form);
    res.status(201).json(form);
  } catch (error) {
    console.error("Error creating form entry:", error);
    res.status(500).json({ error: "Error creating form entry" });
  }
});

// Get all form entries
app.get("/api/forms", async (req, res) => {
  try {
    console.log("Fetch Data Request...");
    const forms = await FormModel.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form entries" });
  }
});
// DELETE request to delete an entry by ID
app.delete("/api/forms/:id", async (req, res) => {
  try {
    const deletedEntry = await FormModel.findByIdAndDelete(req.params.id);
    if (deletedEntry) {
      res.status(200).json({ message: "Entry deleted successfully" });
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// PUT request to edit an entry by ID
app.put("/api/forms/:id", async (req, res) => {
  try {
    const updatedEntry = await FormModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated entry
      }
    );
    if (updatedEntry) {
      res.status(200).json(updatedEntry);
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
