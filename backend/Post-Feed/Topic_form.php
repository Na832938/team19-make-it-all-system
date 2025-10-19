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

$title = !empty($_POST['topic-title']) ? test_input($_POST['topic-title']) : '';
$description = !empty($_POST['topic-description']) ? test_input($_POST['topic-description']) : '';

if (empty($title) || empty($description)) {
  echo json_encode(['success' => false, 'message' => 'All fields are required.']);
  exit;
}

// Store in file
$file = 'topics.txt';
$data = "Title: $title | Description: $description\n";
file_put_contents($file, $data, FILE_APPEND);

echo json_encode(['success' => true, 'message' => 'Topic created successfully!']);
?>
