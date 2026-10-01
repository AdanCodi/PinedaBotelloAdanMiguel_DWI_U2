<?php
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

$passwordSeguro = password_hash($password, PASSWORD_DEFAULT);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registro exitoso | MIKYBARBER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <main class="container form-section">
        <section class="form-card small-card text-center">
            <span class="badge-soft">Correcto</span>
            <h1>Registro exitoso</h1>
            <p>Los datos fueron validados en el servidor. La contraseña no se muestra y se procesa con hash seguro.</p>
            <a class="btn btn-brand" href="login.html">Ir a iniciar sesión</a>
        </section>
    </main>
</body>
</html>
