const secciones = [
    { titulo: "Inicio", descripcion: "Página principal del sitio MikyBarber.", url: "index.html", palabras: "inicio principal barberia servicios" },
    { titulo: "Registro", descripcion: "Formulario para crear una cuenta nueva.", url: "regisTrO.html", palabras: "registro registrar cuenta usuario validacion" },
    { titulo: "Iniciar sesión", descripcion: "Acceso de usuarios registrados.", url: "login.html", palabras: "login iniciar sesion acceso contraseña" },
    { titulo: "Buzón", descripcion: "Enviar sugerencias, dudas o comentarios.", url: "buzon.html", palabras: "buzon sugerencias comentarios dudas" },
    { titulo: "Ayuda", descripcion: "Centro de ayuda y soporte técnico.", url: "ayuda.html", palabras: "ayuda soporte preguntas frecuentes" },
    { titulo: "Contáctanos", descripcion: "Formulario de contacto del sitio.", url: "contacto.html", palabras: "contacto mensaje correo" },
    { titulo: "Mapa del sitio", descripcion: "Estructura de secciones principales, secundarias y elementos adicionales.", url: "mapa-sitio.html", palabras: "mapa sitio secciones elementos" },
    { titulo: "Recuperar contraseña", descripcion: "Formulario para recuperación de cuenta.", url: "recuperar.html", palabras: "recuperar contraseña cuenta" },
    { titulo: "Chat", descripcion: "Chat básico de ayuda.", url: "chat.html", palabras: "chat soporte ayuda" }
];

function mostrarResultados(texto) {
    const contenedor = document.getElementById("resultadosBusqueda");
    if (!contenedor) return;

    const busqueda = texto.toLowerCase().trim();
    const resultados = busqueda === ""
        ? secciones
        : secciones.filter(s => (s.titulo + " " + s.descripcion + " " + s.palabras).toLowerCase().includes(busqueda));

    if (resultados.length === 0) {
        contenedor.innerHTML = `<article><h3>Sin resultados</h3><p>No se encontraron secciones relacionadas con "${texto}".</p></article>`;
        return;
    }

    contenedor.innerHTML = resultados.map(s => `
        <article>
            <h3>${s.titulo}</h3>
            <p>${s.descripcion}</p>
            <a href="${s.url}">Abrir sección</a>
        </article>
    `).join("");
}

const params = new URLSearchParams(window.location.search);
const busquedaInicial = params.get("q") || "";
const inputBusqueda = document.getElementById("inputBusqueda");

if (inputBusqueda) {
    inputBusqueda.value = busquedaInicial;
    mostrarResultados(busquedaInicial);

    const formularioBusqueda = inputBusqueda.closest("form");
    formularioBusqueda.addEventListener("submit", function (e) {
        e.preventDefault();
        mostrarResultados(inputBusqueda.value);
    });
}
