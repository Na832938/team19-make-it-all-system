// Simple in-memory store for the prototype
const tasks = [];

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('dueDate').value || null;

  if (!name) return;

  // basic task model for prototype
  const task = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: name,
    priority,
    dueDate,        // e.g. "2025-10-17"
    status: 'To Do' // default status for now
  };

  tasks.push(task);
  renderTasks();
  form.reset();
});

function renderTasks() {
  list.innerHTML = ''; // clear
  tasks.forEach((t) => {
    const li = document.createElement('li');

    // title
    const title = document.createElement('span');
    title.textContent = t.title;

    // priority & date display
    const meta = document.createElement('span');
    meta.textContent = `  |  ${t.priority}${t.dueDate ? '  ·  Due: ' + t.dueDate : ''}`;

    li.appendChild(title);
    li.appendChild(meta);
    list.appendChild(li);
  });
}
