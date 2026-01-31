import db from "../db.js";   
import { v4 as uuid } from "uuid";

export const createExpense = (req, res) => {
  const { amount, category, description, date: expenseDate } = req.body;

  if (!amount || !category || !expenseDate) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const expense = {
    id: uuid(),
    amount: Math.round(amount * 100),
    category,
    description: description || "",
    date: expenseDate,
    created_at: new Date().toISOString()
  };

  db.prepare(`
    INSERT INTO expenses VALUES (
      @id, @amount, @category, @description, @date, @created_at
    )
  `).run(expense);

  res.status(201).json(expense);
};

export const getExpenses = (req, res) => {
  const { category, sort } = req.query;

  let query = "SELECT * FROM expenses";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  const expenses = db.prepare(query).all(params);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  res.json({
    expenses,
    total: total / 100
  });
};
