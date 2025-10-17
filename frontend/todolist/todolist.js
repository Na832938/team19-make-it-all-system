// ===== In-memory store (prototype) =====
const tasks = [];

// Track which task is currently being edited
let editingId = null;

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

// Create task
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('taskName').value.trim();
  const priorityEl = document.getElementById('priority');
  const dueDateEl = document.getElementById('dueDate');

  const priority = priorityEl ? priorityEl.value : 'Medium';
  const dueDate = dueDateEl && dueDateEl.value ? dueDateEl.value : null;

  if (!name) {
    alert('Task name is required.');
    return;
  }

  const task = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: name,
    priority,
    dueDate,        // e.g. "2025-10-17"
    status: 'To Do'
  };

  tasks.push(task);
  renderTasks();
  form.reset();
});

// Render tasks (supports normal + edit modes)
function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((t) => {
    const li = document.createElement('li');
    li.dataset.id = t.id;
    li.classList.add('task-item', `status-${t.status.replace(' ', '').toLowerCase()}`);

    if (editingId === t.id) {
      // ===== EDIT MODE =====
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = t.title;
      titleInput.className = 'input-title';

      const prioritySelect = document.createElement('select');
      prioritySelect.className = 'select-priority';
      ['Low', 'Medium', 'High'].forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        if (p === t.priority) opt.selected = true;
        prioritySelect.appendChild(opt);
      });

      const dueInput = document.createElement('input');
      dueInput.type = 'date';
      dueInput.className = 'input-due';
      if (t.dueDate) dueInput.value = t.dueDate;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.className = 'btn-save';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'btn-cancel';

      li.appendChild(titleInput);
      li.appendChild(prioritySelect);
      li.appendChild(dueInput);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
      list.appendChild(li);

      // Keyboard helpers: Enter = Save, Esc = Cancel
      li.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          saveBtn.click();
        }
        if (ev.key === 'Escape') {
          ev.preventDefault();
          cancelBtn.click();
        }
      });
    } else {
      // ===== VIEW MODE =====
      const title = document.createElement('span');
      title.textContent = t.title;

      const meta = document.createElement('span');
      meta.textContent = `  |  ${t.priority}${t.dueDate ? '  ·  Due: ' + t.dueDate : ''}`;

      const statusBtn = document.createElement('button');
      statusBtn.className = 'btn-status';
      statusBtn.textContent = t.status;

      const editBtn = document.createElement('button');
      editBtn.className = 'btn-edit';
      editBtn.textContent = 'Edit';

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-delete';
      delBtn.textContent = 'Delete';

      li.appendChild(title);
      li.appendChild(meta);
      li.appendChild(statusBtn);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      list.appendChild(li);
    }
  });
}

// Event delegation for actions on the list
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;
  const idx = tasks.findIndex((x) => x.id === id);
  if (idx === -1) return;

  // Cycle status
  if (e.target.classList.contains('btn-status')) {
    const cycle = ['To Do', 'In Progress', 'Done'];
    const current = tasks[idx].status;
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    tasks[idx].status = next;
    renderTasks();
  }

  // Enter edit mode
  if (e.target.classList.contains('btn-edit')) {
    editingId = id;
    renderTasks();
  }

  // Save edit
  if (e.target.classList.contains('btn-save')) {
    const titleInput = li.querySelector('.input-title');
    const prioritySelect = li.querySelector('.select-priority');
    const dueInput = li.querySelector('.input-due');

    const newTitle = (titleInput?.value || '').trim();
    if (!newTitle) {
      alert('Task name is required.');
      return;
    }

    tasks[idx].title = newTitle;
    tasks[idx].priority = prioritySelect ? prioritySelect.value : tasks[idx].priority;
    tasks[idx].dueDate = dueInput && dueInput.value ? dueInput.value : null;

    editingId = null;
    renderTasks();
  }

  // Cancel edit
  if (e.target.classList.contains('btn-cancel')) {
    editingId = null;
    renderTasks();
  }

  // Delete task
  if (e.target.classList.contains('btn-delete')) {
    tasks.splice(idx, 1);
    // If we were editing this one, reset edit state
    if (editingId === id) editingId = null;
    renderTasks();
  }
});

// Initial render (empty)
renderTasks();
