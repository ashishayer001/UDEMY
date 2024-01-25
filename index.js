import express from "express";
import { connectDB } from "./db.connect.js";
import courseRoutes from "./course/course.route.js"

const app = express();

// to make app understand  json
app.use(express.json());

//database connect
connectDB();

// register routes
app.use(courseRoutes)

//port
const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
