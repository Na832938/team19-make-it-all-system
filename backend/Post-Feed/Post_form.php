<?php
header('Content-Type: application/json');

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
  exit;
}

$title = !empty($_POST['post-title']) ? test_input($_POST['post-title']) : '';
$description = !empty($_POST['post-content']) ? test_input($_POST['post-content']) : '';
$topic = !empty($_POST['topic']) ? test_input($_POST['topic']) : '';

if (empty($title) || empty($description) || empty($topic)) {
  echo json_encode(['success' => false, 'message' => 'All fields are required.']);
  exit;
}

// Store in file
$file = 'posts.txt';
$data = "Topic: $topic | Title: $title | Description: $description\n";
file_put_contents($file, $data, FILE_APPEND);

echo json_encode(['success' => true, 'message' => 'Topic created successfully!']);
?>