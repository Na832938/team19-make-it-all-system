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