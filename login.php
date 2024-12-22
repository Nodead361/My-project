<?php
// Разрешаем запросы с любых источников (для разработки)
header('Access-Control-Allow-Origin: *');  // Разрешаем все домены
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Разрешаем методы
header('Access-Control-Allow-Headers: Content-Type');  // Разрешаем заголовки

header('Content-Type: application/json');  // Устанавливаем тип контента как JSON


// Устанавливаем тип контента как JSON
header('Content-Type: application/json');

// Ваш код для подключения к базе данных и выполнения логики логина
$host = 'localhost';
$db = 'marketplace_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Обработка POST-запроса для логина
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = $data['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
        $stmt->execute([$username, $password]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(["message" => "Login successful", "user" => $user]);
        } else {
            echo json_encode(["error" => "Invalid credentials"]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
