function displayTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'block';
}

function closeTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'none';
  loadPosts(); // Refresh topics after closing the pop-up
}

function loadPosts() {
  fetch('posts.txt', { cache: 'no-store' }) // prevent caching
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load posts file.');
      }
      return response.text();
    })
    .then(text => {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = ''; // clear previous entries

      const lines = text.trim().split('\n');

      lines.forEach(line => {
        // Expected format: Title: <title> | Description: <description>
        const [titlePart, descPart] = line.split('|').map(part => part.trim());
        const title = titlePart.replace('Title:', '').trim();
        const description = descPart.replace('Description:', '').trim();
        const postDiv = createPostElement(title, description);
        postsContainer.appendChild(postDiv);
      });
    })
    .catch(err => {
      console.error('Error:', err);
      document.getElementById('posts-container')
        .innerHTML = '<p style="color: red;">An error occurred while loading posts.</p>';
    });
}

// Load posts on initial page load
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});