<?php
$host = "sql113.infinityfree.com";
$usuario = "if0_42082746";
$password = "CI19AJkn7B0V";
$base_datos = "if0_42082746_dswp8c";

$conexion = new mysqli($host, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>