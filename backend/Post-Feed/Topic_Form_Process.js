document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('topic-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('Topic_form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      const content = document.querySelector('.Topic-PopUp-Content');
      if (data.success) {
        content.innerHTML += `<p style="color: green;">${data.message}</p>`;
      } else {
        content.innerHTML += `<p style="color: red;">${data.message}</p>`;
      }
    })
    .catch(err => {
      console.error('Error:', err);
      document.querySelector('.Topic-PopUp-Content')
        .innerHTML += '<p style="color: red;">An error occurred.</p>';
    });
  });
});
