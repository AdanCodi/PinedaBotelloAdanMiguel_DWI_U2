const formulario = document.getElementById("formRegistro");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        const nombre =
            document.getElementById("nombre").value;

        const correo =
            document.getElementById("correo").value;

        const password =
            document.getElementById("password").value;

        const color =
            document.getElementById("color").value;

        // Validación nombre
        if (nombre.trim() === "") {

            e.preventDefault();

            alert("Ingrese su nombre");

            return;
        }

        // Validación correo
        if (!correo.includes("@")) {

            e.preventDefault();

            alert("Correo inválido");

            return;
        }

        // Validación contraseña
        if (password.length < 8) {

            e.preventDefault();

            alert(
                "La contraseña debe tener mínimo 8 caracteres"
            );

            return;
        }

        // Validación humana
        if (color !== "azul") {

            e.preventDefault();

            alert(
                "Debes seleccionar el color azul para continuar."
            );

            return;
        }

        // POO
        const usuario =
            new Usuario(nombre, correo);

        alert(usuario.mostrarDatos());

    });

}