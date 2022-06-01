import express, { application } from "express";
import cors from "cors";
import { routes } from "./routes/routes";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server runnning in http://localhost:${PORT}`);
});
