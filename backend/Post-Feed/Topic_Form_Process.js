document.getElementById('topic-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('Topic_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.querySelector('Topic-PopUp-Content');
        if (data.success) {
            responseMessage.innerHTML = `<p style="color: green;">${data.message}</p>`;
        } else {
            responseMessage.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('Topic-PopUp-Content').innerHTML = '<p style="color: red;">An error occurred. Please try again.</p>';
    });
});
