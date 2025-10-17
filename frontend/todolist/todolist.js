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
    li.dataset.id = t.id; // attach id for actions

    // Title + meta
    const title = document.createElement('span');
    title.textContent = t.title;

    const meta = document.createElement('span');
    meta.textContent = `  |  ${t.priority}${t.dueDate ? '  ·  Due: ' + t.dueDate : ''}`;

    // Status button (cycles states)
    const statusBtn = document.createElement('button');
    statusBtn.className = 'btn-status';
    statusBtn.textContent = t.status; // shows current status

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = 'Delete';

    // Wrap
    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(statusBtn);
    li.appendChild(delBtn);

    // For CSS styling hooks:
    li.classList.add('task-item', `status-${t.status.replace(' ', '').toLowerCase()}`);
    list.appendChild(li);
  });
}

// Event delegation for clicks on status/delete
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;
  const idx = tasks.findIndex((x) => x.id === id);
  if (idx === -1) return;

  if (e.target.classList.contains('btn-status')) {
    // cycle status: To Do -> In Progress -> Done -> To Do
    const cycle = ['To Do', 'In Progress', 'Done'];
    const current = tasks[idx].status;
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    tasks[idx].status = next;
    renderTasks();
  }

  if (e.target.classList.contains('btn-delete')) {
    tasks.splice(idx, 1);
    renderTasks();
  }
});

