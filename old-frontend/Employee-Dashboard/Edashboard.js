function sharePost() {
    const topicInput = document.getElementById('topicInput');
    const postInput = document.getElementById('postInput');
    const sharedPosts = document.getElementById('sharedPosts');

    const topic = topicInput.value.trim();
    const post = postInput.value.trim();
    const wordCount = post.split(/\s+/).filter(word => word.length > 0).length;

    if (!topic) {
        alert('Please enter a topic before sharing your post.');
        return;
    }

    if (!post) {
        alert('Please enter a post before sharing.');
        return;
    }
    
    if (!topic && !post) {
        alert('Please enter both a topic and a post before sharing.');
        return;
    }

    if (wordCount < 5 || wordCount > 200) {
        alert('Your post must be between 5 and 200 words. Please adjust your content accordingly.');
        return;
    }

    const postElement = document.createElement('div');
    postElement.className = 'alert alert-info';
    postElement.innerHTML = `<strong>${topic}</strong><p>${post}</p>`;
    sharedPosts.appendChild(postElement);

    topicInput.value = '';
    postInput.value = '';
}
document.getElementById('shareButton').addEventListener('click', sharePost);

function notes() {
    const notesInput = document.getElementById('notesInput');
    const notesList = document.getElementById('notesList');
    const sharedNotes = document.getElementById('sharedNotes');

    const note = notesInput.value.trim();

    if (!note) {
        alert('Please enter a note before adding.');
        return;
    }

    const noteElement = document.createElement('li');
    noteElement.className = 'list-group-item';
    noteElement.textContent = note;
    notesList.appendChild(noteElement);

    notesInput.value = '';
}
document.getElementById('notesButton').addEventListener('click', notes);

