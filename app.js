import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use("/api", userRoutes);

// root route
app.get("/", (req, res) => {
  res.send("Welcome to the User Management API");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});