function displayTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'block';
}

function closeTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'none';
  loadPosts(); // Refresh topics after closing the pop-up
}

async function loadPosts() {
    const URL = new URLSearchParams(window.location.search);
    const selectedTopic= URL.get('topic') || null;
    console.log("Loading posts for topic:", selectedTopic);
  try {
    
    const response = await fetch('/backend/Post-Feed/posts.txt', { cache: 'no-store' }); // prevent caching
    if (!response.ok) {
      throw new Error('Failed to load topics file.');
    }

    const text = await response.text();

    const topicsContainer = document.getElementById('posts-container');
    topicsContainer.innerHTML = ''; // clear previous entries

    const lines = text.trim().split('\n');

    lines.forEach(line => {
      // Expected format: Title: <title> | Description: <description>
      const match = line.match(/Topic:\s*(.*?)\s*\|\s*Title:\s*(.*?)\s*\|\s*Description:\s*(.*)/);
      if (match) {
        const topic = match[1];
        console.log("Found post for topic:", topic);
        const title = match[2];
        const description = match[3];
        if (topic === selectedTopic){

        const topicDiv = document.createElement('div');
        topicDiv.className = 'post';
        topicDiv.innerHTML = `
          <div class="post-title">${title}</div>
          <div class="post-content">${description}</div>
        `;
        topicsContainer.appendChild(topicDiv);
      }}
      
    });}catch (error) {
    console.error('Error loading posts:', error);
  };}



document.addEventListener('DOMContentLoaded', () => {
    console.log("DomContentLoaded fired in Topic.js");
    loadPosts();
});