<?php
header('Access-Control-Allow-Origin: *');  // Разрешаем все домены
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Разрешаем методы
header('Access-Control-Allow-Headers: Content-Type');  // Разрешаем заголовки

header('Content-Type: application/json');  // Устанавливаем тип контента как JSON

include('../db/database.php');

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = password_hash($data->password, PASSWORD_BCRYPT);
$email = $data->email;
$role = $data->role;

$sql = "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $password, $email, $role]);

echo json_encode(["message" => "User created"]);
?>
