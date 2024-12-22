<?php
header('Access-Control-Allow-Origin: *');  // Разрешаем все домены
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Разрешаем методы
header('Access-Control-Allow-Headers: Content-Type');  // Разрешаем заголовки

header('Content-Type: application/json');  // Устанавливаем тип контента как JSON


// Устанавливаем тип контента как JSON
header('Content-Type: application/json');

// Ваш код для подключения к базе данных и получения данных
$host = 'localhost'; // Адрес вашего сервера
$db = 'marketplace_db'; // Имя базы данных
$user = 'root'; // Логин
$pass = ''; // Пароль для XAMPP по умолчанию

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение всех заказов
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("SELECT * FROM orders");
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($orders);
    }

    // Добавление нового заказа
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $product_id = $data['product_id'];
        $quantity = $data['quantity'];
        $total_price = $data['total_price'];

        $stmt = $pdo->prepare("INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)");
        $stmt->execute([$product_id, $quantity, $total_price]);

        echo json_encode(["message" => "Order added successfully"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
