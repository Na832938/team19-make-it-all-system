const tasks = [];
let editingId = null; // which task is currently in "edit" mode

// UI Elements 
const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const searchText = document.getElementById('searchText');
const sortBy = document.getElementById('sortBy');

// Simple UI state for filters & sort
const ui = { status: 'All', priority: 'All', q: '', sort: 'none' };
const priorityRank = { Low: 1, Medium: 2, High: 3 };

// Create Task 
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

  const id =
    (window.crypto && window.crypto.randomUUID && crypto.randomUUID()) ||
    String(Date.now()) + Math.random().toString(16).slice(2);

  const task = {
    id,
    title: name,
    priority,
    dueDate,        
    status: 'To Do' 
  };

  tasks.push(task);
  editingId = null;
  renderTasks();
  form.reset();
});

// Filters / Search / Sort handlers 
if (filterStatus) {
  filterStatus.addEventListener('change', () => {
    ui.status = filterStatus.value;
    renderTasks();
  });
}
if (filterPriority) {
  filterPriority.addEventListener('change', () => {
    ui.priority = filterPriority.value;
    renderTasks();
  });
}
if (searchText) {
  searchText.addEventListener('input', () => {
    ui.q = searchText.value.trim().toLowerCase();
    renderTasks();
  });
}
if (sortBy) {
  sortBy.addEventListener('change', () => {
    ui.sort = sortBy.value;
    renderTasks();
  });
}

// Helpers
function applyFiltersAndSort(source) {
  let out = source.filter((t) => {
    const statusOK = ui.status === 'All' || t.status === ui.status;
    const prioOK = ui.priority === 'All' || t.priority === ui.priority;
    const qOK = !ui.q || (t.title || '').toLowerCase().includes(ui.q);
    return statusOK && prioOK && qOK;
  });

  switch (ui.sort) {
    case 'dueAsc':
      out.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
      break;
    case 'dueDesc':
      out.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate.localeCompare(a.dueDate);
      });
      break;
    case 'prioAsc':
      out.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
      break;
    case 'prioDesc':
      out.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
      break;
    default:
      // no sorting
      break;
  }

  return out;
}

// Render
function renderTasks() {
  list.innerHTML = '';

  const view = applyFiltersAndSort(tasks);

  view.forEach((t) => {
    const li = document.createElement('li');
    li.dataset.id = t.id;
    li.classList.add('task-item', `status-${t.status.replace(' ', '').toLowerCase()}`);

    if (editingId === t.id) {
      //EDIT MODE 
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = t.title;
      titleInput.className = 'input-title';
      titleInput.setAttribute('aria-label', 'Task title');

      const prioritySelect = document.createElement('select');
      prioritySelect.className = 'select-priority';
      ['Low', 'Medium', 'High'].forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        if (p === t.priority) opt.selected = true;
        prioritySelect.appendChild(opt);
      });
      prioritySelect.setAttribute('aria-label', 'Priority');

      const dueInput = document.createElement('input');
      dueInput.type = 'date';
      dueInput.className = 'input-due';
      if (t.dueDate) dueInput.value = t.dueDate;
      dueInput.setAttribute('aria-label', 'Due date');

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.className = 'btn btn-save';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'btn btn-cancel';

      li.appendChild(titleInput);
      li.appendChild(prioritySelect);
      li.appendChild(dueInput);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);

      // Keyboard shortcuts: Enter = Save, Esc = Cancel
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
      // VIEW MODE
      const title = document.createElement('span');
      title.textContent = t.title;
      title.className = 'task-title';

      const meta = document.createElement('span');
      meta.textContent = `  |  ${t.priority}${t.dueDate ? '  ·  Due: ' + t.dueDate : ''}`;
      meta.className = 'task-meta';

      const statusBtn = document.createElement('button');
      statusBtn.className = 'btn btn-status';
      statusBtn.textContent = t.status;
      statusBtn.setAttribute('title', 'Click to change status');

      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-edit';
      editBtn.textContent = 'Edit';

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-delete';
      delBtn.textContent = 'Delete';

      li.appendChild(title);
      li.appendChild(meta);
      li.appendChild(statusBtn);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
    }

    list.appendChild(li);
  });
}

// ===== Actions via Event Delegation =====
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

  // Save from edit mode
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

  // Cancel edit mode
  if (e.target.classList.contains('btn-cancel')) {
    editingId = null;
    renderTasks();
  }

  // Delete task
  if (e.target.classList.contains('btn-delete')) {
    tasks.splice(idx, 1);
    if (editingId === id) editingId = null;
    renderTasks();
  }
});

// Initial render
renderTasks();
