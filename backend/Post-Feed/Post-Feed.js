    
function displayTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'block';
}

function closeTopicPopUp() {
  document.querySelector('.Topic-PopUp').style.display = 'none';
}

function createPostElement(title, content) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.innerHTML = `<div class="post-title">${title}</div><div class="post-content">${content}</div>`;
  return postDiv;
}

function searchTopic() {
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
    


document.addEventListener('DOMContentLoaded', () => {
  const topicsContainer = document.getElementById('topics-container');

  // When the form successfully posts, you can update the feed dynamically if needed
  document.getElementById('topic-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('topic-title').value;
    const desc = document.getElementById('topic-description').value;

    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic';
    topicDiv.innerHTML = `<h2>${title}</h2><p>${desc}</p>`;

    topicsContainer.appendChild(topicDiv);
    closeTopicPopUp();
  });
});
