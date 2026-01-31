const apiUrl = "https://fenmo-technical-assessment-1.onrender.com/expenses"; 

const form = document.getElementById("expense-form");
const tableBody = document.getElementById("expenses-table");
const totalEl = document.getElementById("total");
const filterInput = document.getElementById("filter-category");
const filterBtn = document.getElementById("filter-btn");
const sortBtn = document.getElementById("sort-btn");

let sortNewest = false;

async function loadExpenses() {
  try {
    let url = apiUrl;
    const category = filterInput.value.trim();
    const params = [];
    if (category) params.push(`category=${category}`);
    if (sortNewest) params.push(`sort=date_desc`);
    if (params.length) url += "?" + params.join("&");

    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
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

    totalEl.textContent = data.total / 100; // total in rupees
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='4'>Failed to load expenses</td></tr>";
  }
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

// Filter and sort
filterBtn.addEventListener("click", loadExpenses);
sortBtn.addEventListener("click", () => {
  sortNewest = !sortNewest;
  loadExpenses();
});

// Initial load
loadExpenses();
