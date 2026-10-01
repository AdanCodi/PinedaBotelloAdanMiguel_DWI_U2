<?php
session_start();
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $correo = trim($_POST["correo"]);
    $contrasena = trim($_POST["contrasena"]);

    if (empty($correo) || empty($contrasena)) {
        die("Correo y contraseña son obligatorios.");
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        die("Correo no válido.");
    }

    $sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        if (password_verify($contrasena, $usuario["contrasena"])) {
            $_SESSION["usuario_id"] = $usuario["id"];
            $_SESSION["usuario_nombre"] = $usuario["nombre"];

            header("Location: dashboard.php");
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El correo no está registrado.";
    }

    $stmt->close();
    $conexion->close();
}
?>