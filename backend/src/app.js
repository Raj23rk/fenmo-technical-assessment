import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenses.routes.js"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

export default app;
