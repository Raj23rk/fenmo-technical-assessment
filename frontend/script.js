const apiUrl = "http://localhost:3000/expenses";

const form = document.getElementById("expense-form");
const tableBody = document.getElementById("expenses-table");
const totalEl = document.getElementById("total");
const filterInput = document.getElementById("filter-category");
const filterBtn = document.getElementById("filter-btn");
const sortBtn = document.getElementById("sort-btn");

let sortNewest = false;

// Fetch and render expenses
async function loadExpenses() {
  let url = apiUrl;
  const category = filterInput.value.trim();
  const params = [];
  if (category) params.push(`category=${category}`);
  if (sortNewest) params.push(`sort=date_desc`);
  if (params.length) url += "?" + params.join("&");

  const res = await fetch(url);
  const data = await res.json();

  tableBody.innerHTML = "";
  data.expenses.forEach(exp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>${exp.description}</td>
      <td>₹${exp.amount / 100}</td>
    `;
    tableBody.appendChild(tr);
  });

  totalEl.textContent = data.total.toFixed(2);
}

// Handle form submit
form.addEventListener("submit", async e => {
  e.preventDefault();
  const expense = {
    amount: parseFloat(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    date: document.getElementById("date").value
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });

  form.reset();
  loadExpenses();
});

// Filter button
filterBtn.addEventListener("click", loadExpenses);

// Sort button
sortBtn.addEventListener("click", () => {
  sortNewest = !sortNewest;
  loadExpenses();
});

// Initial load
loadExpenses();
