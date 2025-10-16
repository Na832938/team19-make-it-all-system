    
let displayTopicPopUp = () => {
    document.querySelector('.Topic-PopUp').style.display = 'block';
}
let closeTopicPopUp = () => {
    document.querySelector('.Topic-PopUp').style.display = 'none';
}

function createPostElement(title, content) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'post-title';
    titleDiv.textContent = title;
    postDiv.appendChild(titleDiv);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'post-content';
    contentDiv.textContent = content;
    postDiv.appendChild(contentDiv);
    
    return postDiv;
}
let topics = [];
function createNewTopic(title, description) {
    const topic = { title, description, posts: [] };
    topics.push(topic);
    return topic;
}
 document.getElementById('topic-form').addEventListener('submit', () => { //need to fix this
    const title = document.getElementById('topic-title').value;
    const description = document.getElementById('topic-description').value;
    createNewTopic(title, description);
    closeTopicPopUp();
});

function addPostToTopic(topic, postTitle, postContent) {
    const post = createPostElement(postTitle, postContent);
    topic.posts.push(post);
    return post;
}

document.addEventListener('DOMContentLoaded', () => {
    
    const topicsContainer = document.getElementById('topics-container');
    document.getElementById('topic-form').addEventListener('submit', () => {
    
        topics.forEach(topic => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
        
            const topicTitle = document.createElement('h2');
            topicTitle.textContent = topic.title;
            topicDiv.appendChild(topicTitle);
        
            const topicDescription = document.createElement('p');
            topicDescription.textContent = topic.description;
            topicDiv.appendChild(topicDescription);

            topicsContainer.appendChild(topicDiv);})});});

