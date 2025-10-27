
<?php
session_start();

// Simulated data (in real use, this would come from a database)
$tasks = [
    ["Finish report", false],
    ["Attend team meeting", false],
    ["Update project plan", false],
    ["Review code", false]
];

$totalTasks = count($tasks);
$completedTasks = count(array_filter($tasks, function($task) {
    return $task[1] === true;
}));

$progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

// Get employee info from session
$employeeName = $_SESSION['employee_name'] ?? 'N/A';
$employeePosition = $_SESSION['employee_position'] ?? 'N/A';
$employeeDepartment = $_SESSION['employee_department'] ?? 'N/A';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-4">
        <h1 class="text-center">Employee Dashboard</h1>

        <!-- Progress Bar Section -->
        <div class="card mt-4">
            <div class="card-header">Task Completion Progress</div>
            <div class="card-body">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: <?= $progress ?>%;" aria-valuenow="<?= $progress ?>" aria-valuemin="0" aria-valuemax="100">
                        <?= $progress ?>%
                    </div>
                </div>
            </div>
        </div>

        
        <!-- To-Do List Section -->
        <div class="card mt-4">
            <div class="card-header">Your To-Do List</div>
            <div class="card-body">
                <ul class="list-group mb-3" id="todoList">
                </ul>
                <input type="text" id="newTaskInput" class="form-control mb-2" placeholder="Add a new task">
                <button class="btn btn-primary" onclick="addTask()">Add Task</button>
            </div>
        </div>


        <!-- Employee Info Section -->
        <div class="card mt-4">
            <div class="card-header">Employee Information</div>
            <div class="card-body">
                <p><strong>Name:</strong> <?= htmlspecialchars($employeeName) ?></p>
                <p><strong>Position:</strong> <?= htmlspecialchars($employeePosition) ?></p>
                <p><strong>Department:</strong> <?= htmlspecialchars($employeeDepartment) ?></p>
            </div>
        </div>


        <!-- Task Overview Section -->
        <div class="card mt-4">
            <div class="card-header">Task Overview</div>
            <div class="card-body">
                <p>You have <?= count($tasks) ?> tasks assigned.</p>
            </div>
        </div>

        <!-- Topic and Post Sharing Section -->
        <div class="card mt-4">
            <div class="card-header">Topic & Post Sharing</div>
            <div class="card-body">
                <input type="text" id="topicInput" class="form-control mb-2" placeholder="Enter topic">
                <textarea id="postInput" class="form-control mb-2" rows="3" placeholder="Write your post"></textarea>
                <button id="shareButton" class="btn btn-success">Share Post</button>
                <div id="sharedPosts" class="mt-3"></div>
            </div>
        </div>

        <!-- notes sharing sections -->
        <div class="card mt-4">
            <div class="card-header">Notes</div>
            <div class="card-body">
                <textarea id="notesInput" class="form-control mb-2" rows="2" placeholder="Write your notes"></textarea>
                <button id="notesButton" class="btn btn-success">Add Notes</button>
                <ul id="notesList" class="lis-group mt-3"></ul>
            </div>
        </div>
    </div>

    <!-- Link to external JS -->
    <script src="Edashboard.js"></script>
</body>
</html>