function displayTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'block';
}

function closeTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'none';
  loadPosts(); // Refresh topics after closing the pop-up
}

async function loadPosts() {
    console.log("loadPosts called");
  try {
    console.log("loadPosts called");
    const response = await fetch('posts.txt', { cache: 'no-store' }); // prevent caching
    if (!response.ok) {
      throw new Error('Failed to load topics file.');
    }

    const text = await response.text();

    const topicsContainer = document.getElementById('posts-container');
    topicsContainer.innerHTML = ''; // clear previous entries

    const lines = text.trim().split('\n');

    lines.forEach(line => {
      // Expected format: Title: <title> | Description: <description>
      const match = line.match(/Title:\s*(.*?)\s*\|\s*Description:\s*(.*)/);
      if (match) {
        const title = match[1];
        const description = match[2];

        const topicDiv = document.createElement('div');
        topicDiv.className = 'post';
        topicDiv.innerHTML = `
          <div class="post-title">${title}</div>
          <div class="post-content">${description}</div>
        `;
        topicsContainer.appendChild(topicDiv);
      }
    });}catch (error) {
    console.error('Error loading posts:', error);
  };}



document.addEventListener('DOMContentLoaded', () => {
    console.log("DomContentLoaded fired in Topic.js");
    loadPosts();
});