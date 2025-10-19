    
function displayTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'block';
}

function closeTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'none';
  loadTopics(); // Refresh topics after closing the pop-up
}

function createPostElement(title, content) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.innerHTML = `<div class="post-title">${title}</div><div class="post-content">${content}</div>`;
  return postDiv;
}

function searchTopic() {// to rewrite 
  const searchTerm = prompt("Enter topic title to search:");
  if (!searchTerm) return;

  fetch('Topics.txt')
    .then(response => response.text())
    .then(data => {
      const topics = data.split('\n').filter(line => line.trim() !== '');
      const results = topics.filter(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));

      const topicsContainer = document.getElementById('topics-container');
      topicsContainer.innerHTML = ''; // Clear previous results

      if (results.length === 0) {
        topicsContainer.innerHTML = '<p>No topics found.</p>';
      } else {
        results.forEach(topicLine => {
          const [titlePart, descPart] = topicLine.split('|').map(part => part.trim());
          const title = titlePart.replace('Title:', '').trim();
          const description = descPart.replace('Description:', '').trim();
          const topicDiv = createPostElement(title, description);});
          topicsContainer.appendChild(topicDiv);
        }});
      }
    

// Function to load and display topics from topics.txt
async function loadTopics() {
  try {
    const response = await fetch('topics.txt', { cache: 'no-store' }); // prevent caching
    if (!response.ok) {
      throw new Error('Failed to load topics file.');
    }

    const text = await response.text();

    const topicsContainer = document.getElementById('topics-container');
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
          <button onclick="goToTopic('${encodeURIComponent(title)}')">Go to Topic</button>
        `;
        topicsContainer.appendChild(topicDiv);
      }
    });

  } catch (error) {
    console.error('Error loading topics:', error);
    document.getElementById('topics-container').innerHTML =
      '<p style="color:red;">Error loading topics.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTopics();
});

function goToTopic(title) {
    