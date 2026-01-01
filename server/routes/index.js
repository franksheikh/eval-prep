import express from "express";
import crypto from "crypto";
import fs from "fs";

const serviceRouter = express.Router();
let users = [
  {
    id: crypto.randomUUID(),
    age: 34,
    name: "Arthur Morgan",
  },
  {
    id: crypto.randomUUID(),
    age: 45,
    name: "Tara Mann",
  },
  {
    id: crypto.randomUUID(),
    age: 56,
    name: "Joel Embiid",
  },
  {
    id: crypto.randomUUID(),
    age: 67,
    name: "LeBron James",
  },
  {
    id: crypto.randomUUID(),
    age: 78,
    name: "Lisa Leslie",
  },
  {
    id: crypto.randomUUID(),
    age: 87,
    name: "Candace Parker",
  },
  {
    id: crypto.randomUUID(),
    age: 98,
    name: "Barack Obama",
  },
  {
    id: crypto.randomUUID(),
    age: 2,
    name: "Dobby",
  },
];

serviceRouter
  .get("/users", (req, res) => {
    res.json({
      status: 201,
      users,
    });
  })
  .post("/users", (req, res) => {
    const { user } = req.body;

    users.push({
      id: crypto.randomUUID(),
      age: Math.ceil(Math.random() * 100),
      name: user,
    });

    const logEntry = `
		${new Date().toISOString()} - added user ${user}
	`;

    fs.appendFileSync("users.log", logEntry);

    res.json({
      status: 201,
      users,
    });
  })
  .delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const deletedUser = users.find((user) => user.id === id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    users = users.filter((user) => user.id != id);

    const logEntry = `
		${new Date().toISOString()} - deleted user ${id}
	`;
    fs.appendFileSync("users.log", logEntry);
    res.json({
      status: 200,
      users,
    });
  });

export default serviceRouter;
