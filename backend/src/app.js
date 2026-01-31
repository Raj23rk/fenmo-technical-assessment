import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenses.routes.js"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));


export default app;
