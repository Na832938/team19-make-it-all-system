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
        alert('Please enter both a topic and a post before attempting to share.');
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
// Event listener for the share button
document.getElementById('shareButton').addEventListener('click', sharePost);

