<?php

session_start();

if (!isset($_SESSION["usuario_id"])) {

    header("Location: login.html");
    exit();

}

$nombre = $_SESSION["usuario_nombre"];

?>

<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <title>
        Mi cuenta | MIKYBARBER
    </title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <link
        rel="stylesheet"
        href="css/estilos.css">

</head>

<body>

<main class="container form-section">

    <section class="form-card text-center">

        <span class="badge-soft">
            Mi cuenta
        </span>

        <h1>
            Bienvenido,
            <?php echo htmlspecialchars($nombre); ?>
        </h1>

        <p>
            Has iniciado sesión correctamente
            en MIKYBARBER.
        </p>

        <a
            href="unidad2.html"
            class="btn btn-brand">

            Ver servicios

        </a>

    </section>

</main>

</body>

</html>