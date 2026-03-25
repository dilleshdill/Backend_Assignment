import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../utils/fileHandler.js";

// GET /users
export const getUsers = (req, res) => {
  let users = readData();
  const { search, sort, order } = req.query;

  // Search
  if (search) {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort) {
    users.sort((a, b) => {
      if (order === "desc") {
        return b[sort].localeCompare(a[sort]);
      }
      return a[sort].localeCompare(b[sort]);
    });
  }

  res.json(users);
};

// GET /users/:id
export const getUserById = (req, res) => {
  const users = readData();
  const user = users.find((u) => u.id === req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// POST /users
export const createUser = (req, res) => {
  const users = readData();

  const newUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);
  writeData(users);

  res.status(201).json(newUser);
};

// PUT /users/:id
export const updateUser = (req, res) => {
  const users = readData();
  const index = users.findIndex((u) => u.id === req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "User not found" });

  users[index] = {...users[index],...req.body,
  };

  writeData(users);
  res.json(users[index]);
};

// DELETE /users/:id
export const deleteUser = (req, res) => {
  let users = readData();
  const filtered = users.filter((u) => u.id !== req.params.id);

  if (users.length === filtered.length)
    return res.status(404).json({ message: "User not found" });

  writeData(filtered);
  res.json({ message: "User deleted successfully" });
};