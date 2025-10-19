<?php
$title=$description="";
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (empty($_POST['topic-title'])) {
        error_log("Title is required.");
    }else{
        $title = test_input($_POST['topic-title']);
        //echo $title;
    
    }
    if (empty($_POST['topic-description'])) {
       error_log("Description is required."); 
    }else{
        $description = test_input( $_POST['topic-description']);}
        //echo $description;

 }else{
     echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
    }
   



// Use file as database for the start
$file = 'topics.txt';
$data = "Title: $title , Description: $description\n";
file_put_contents($file, $data, FILE_APPEND); 
echo json_encode(['success' => true, 'message' => 'Topic created successfully!']);
?>
