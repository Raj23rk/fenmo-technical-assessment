# Fenmo – Expense Tracker (Technical Assessment)

A minimal full-stack Expense Tracker application built as part of the **Fenmo technical assessment**.

The app allows users to record, view, filter, sort, and total their personal expenses, designed with production-readiness in mind.

---

## Live Demo

**Frontend + Backend (Hosted):**  
https://fenmo-technical-assessment-6bwq.vercel.app/
 https://fenmo-technical-assessment-1.onrender.com
---

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- REST API
- ES Modules

### Frontend
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

---

## Features

- Create a new expense (amount, category, description, date)
- View list of expenses
- Filter expenses by category
- Sort expenses by date (newest first)
- View total expense amount for the current list
- Idempotent-safe API behavior (handles retries / refreshes)

---

## Project Structure

fenmo-expense-tracker/
├── backend/
│ ├── src/
│ │ ├── app.js
│ │ ├── db.js
│ │ ├── routes/
│ │ │ └── expenses.routes.js
│ │ └── controllers/
│ │ └── expenses.controller.js
│ ├── package.json
│ └── .gitignore
├── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css
└── README.md

### Create Expense
`POST /expenses`

**Request Body**
```json
{
  "amount": 200,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-01-30"
}