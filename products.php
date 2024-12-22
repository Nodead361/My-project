<?php
// Разрешаем запросы с любых источников (для разработки)
header('Access-Control-Allow-Origin: *');  // Разрешаем все домены
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Разрешаем методы
header('Access-Control-Allow-Headers: Content-Type');  // Разрешаем заголовки

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
    
    // Ваш запрос для получения товаров
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products); // Отправляем данные в формате JSON
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
