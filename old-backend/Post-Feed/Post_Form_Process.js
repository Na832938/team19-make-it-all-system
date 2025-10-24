document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('post-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append('topic', new URLSearchParams(window.location.search).get('topic') || '');
    console.log(formData.get('topic'));

    fetch('/backend/Post-Feed/Post_form.php', {
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