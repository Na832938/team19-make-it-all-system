<?php
$title=$description='';
$title = isset($_GET['topic-title']) ? trim(htmlspecialchars($_GET['topic-title'])) : '';
var_dump($title);
$description = isset($_GET['topic-description']) ? trim(htmlspecialchars($_GET['topic-description'])) : '';
var_dump($description);
if (empty($title) || empty($description)) {
    echo json_encode(['success' => false, 'message' => 'Title and description are required.']);
    exit;
}

// Use file as database for the start
$file = 'topics.txt';
$data = "Title: $title\nDescription: $description\n\n";
file_put_contents($file, $data, FILE_APPEND);

echo json_encode(['success' => true, 'message' => 'Topic created successfully!']);
?>
