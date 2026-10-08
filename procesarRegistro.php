<?php

include "conexion.php";

$nombre = trim($_POST['nombre'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$password = $_POST['password'] ?? '';
$color = $_POST['color'] ?? '';

if ($nombre === '' || strlen($nombre) < 3) {
    die('Error: el nombre es obligatorio y debe tener mínimo 3 caracteres.');
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    die('Error: correo inválido.');
}

if (strlen($password) < 8) {
    die('Error: la contraseña debe tener mínimo 8 caracteres.');
}

if ($color !== 'azul') {
    die('Error: validación humana incorrecta.');
}

/* Comprobar si el correo ya existe */

$sql = "SELECT id FROM usuarios WHERE correo = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    die("Este correo ya se encuentra registrado.");
}

$stmt->close();

/* Cifrar contraseña */

$passwordSeguro = password_hash($password, PASSWORD_DEFAULT);

/* Insertar usuario */

$sql = "INSERT INTO usuarios (nombre, correo, contrasena)
        VALUES (?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "sss",
    $nombre,
    $correo,
    $passwordSeguro
);

if ($stmt->execute()) {

    $registroExitoso = true;

} else {

    die("Error al registrar el usuario.");

}

$stmt->close();
$conexion->close();

?>
<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <title>Registro exitoso | MIKYBARBER</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <link rel="stylesheet"
          href="css/estilos.css">

</head>

<body>

<main class="container form-section">

    <section class="form-card small-card text-center">

        <span class="badge-soft">
            Registro completado
        </span>

        <h1>¡Bienvenido a MIKYBARBER!</h1>

        <p>
            Tu cuenta se creó correctamente.
            Ahora puedes iniciar sesión con tu correo
            y contraseña.
        </p>

        <a
            class="btn btn-brand"
            href="login.html">

            Iniciar sesión

        </a>

    </section>

</main>

</body>

</html>