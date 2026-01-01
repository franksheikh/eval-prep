import express from "express";
import cors from "cors";
import serviceRouter from "./routes/index.js";
const app = express();
const apiRouter = express.Router();
app.use(express.json());
app.use(cors());

const port = 3001;

app.use("/", apiRouter);
apiRouter.use("/api", serviceRouter);

app.get("/", (req, res) => {
  res.json({
    status: 201,
    message: "Hello There",
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error in server", port);
  }
  console.log(`Listening on port ${port}`);
});
