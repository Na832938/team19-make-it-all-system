const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('taskName').value;
  const li = document.createElement('li');
  li.textContent = name;
  list.appendChild(li);
  form.reset();
});
