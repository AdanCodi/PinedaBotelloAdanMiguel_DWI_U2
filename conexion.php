<?php
$host = "sql304.infinityfree.com";
$usuario = "if0_43106608";
$password = "Nmlejdnh0ThngX1";
$base_datos = "if0_43106608_barberia";

$conexion = new mysqli($host, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>