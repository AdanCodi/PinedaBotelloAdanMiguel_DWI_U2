class ServicioBarberia {
  constructor(nombre, descripcion, precio, duracion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracion = duracion;
  }

  obtenerDetalle() {
    return `
      <strong>${this.nombre}</strong><br>
      ${this.descripcion}<br>
      Precio: $${this.precio}<br>
      Duración aproximada: ${this.duracion}
    `;
  }
}

class SitioDinamico {
  constructor() {
    this.servicios = {
      corte: new ServicioBarberia(
        "Corte clásico",
        "Servicio de corte personalizado con acabado profesional.",
        150,
        "35 minutos"
      ),
      barba: new ServicioBarberia(
        "Arreglo de barba",
        "Perfilado, diseño y cuidado de barba con producto especial.",
        120,
        "25 minutos"
      ),
      paquete: new ServicioBarberia(
        "Paquete completo",
        "Incluye corte, barba y aplicación de producto para peinado.",
        250,
        "60 minutos"
      )
    };

    this.promociones = [
      {
        titulo: "Promoción del día",
        texto: "Corte clásico y arreglo de barba por solo $220."
      },
      {
        titulo: "Cliente frecuente",
        texto: "En tu quinta visita recibe un descuento especial."
      },
      {
        titulo: "Paquete estudiantil",
        texto: "Presenta tu credencial y recibe precio preferencial."
      }
    ];

    this.slides = [
      {
        titulo: "Atención profesional",
        texto: "Agenda tu servicio y recibe atención personalizada."
      },
      {
        titulo: "Servicios completos",
        texto: "Cortes, barba, paquetes y asesoría de imagen."
      },
      {
        titulo: "Ambiente cómodo",
        texto: "Un espacio diseñado para que tengas una buena experiencia."
      }
    ];

    this.indiceSlide = 0;
  }

  iniciar() {
    this.configurarBotonesServicio();
    this.configurarPromocionAsincrona();
    this.configurarEventosMouse();
    this.configurarCarrusel();
    this.configurarCalculadora();
    this.configurarScroll();
    this.configurarModoVisual();
  }

  mostrarServicio(clave) {
    const resultado = document.getElementById("resultadoServicio");
    const servicio = this.servicios[clave];

    if (servicio && resultado) {
      resultado.innerHTML = servicio.obtenerDetalle();
      resultado.classList.add("animacion-respuesta");

      setTimeout(() => {
        resultado.classList.remove("animacion-respuesta");
      }, 600);
    }
  }

  configurarBotonesServicio() {
    const botones = document.querySelectorAll(".btn-servicio");

    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const clave = boton.dataset.servicio;
        this.mostrarServicio(clave);
      });
    });
  }

  obtenerPromocionAsincrona() {
    return new Promise(resolve => {
      setTimeout(() => {
        const posicion = Math.floor(Math.random() * this.promociones.length);
        resolve(this.promociones[posicion]);
      }, 1200);
    });
  }

  configurarPromocionAsincrona() {
    const boton = document.getElementById("btnPromocion");
    const resultado = document.getElementById("resultadoPromocion");

    if (!boton || !resultado) {
      return;
    }

    boton.addEventListener("click", async () => {
      resultado.innerHTML = "Cargando promoción...";
      boton.disabled = true;

      const promocion = await this.obtenerPromocionAsincrona();

      resultado.innerHTML = `
        <strong>${promocion.titulo}</strong><br>
        ${promocion.texto}
      `;

      resultado.classList.add("animacion-respuesta");

      setTimeout(() => {
        resultado.classList.remove("animacion-respuesta");
      }, 600);

      boton.disabled = false;
    });
  }

  configurarEventosMouse() {
    const tarjetas = document.querySelectorAll(".tarjeta-mouse");

    tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener("mouseover", () => {
        tarjeta.classList.add("tarjeta-activa");
      });

      tarjeta.addEventListener("mouseleave", () => {
        tarjeta.classList.remove("tarjeta-activa");
      });

      tarjeta.addEventListener("mousemove", evento => {
        const x = evento.offsetX;
        const y = evento.offsetY;

        tarjeta.style.setProperty("--pos-x", `${x}px`);
        tarjeta.style.setProperty("--pos-y", `${y}px`);
      });
    });
  }

  configurarCarrusel() {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    if (!btnAnterior || !btnSiguiente) {
      return;
    }

    btnAnterior.addEventListener("click", () => {
      this.indiceSlide--;

      if (this.indiceSlide < 0) {
        this.indiceSlide = this.slides.length - 1;
      }

      this.actualizarCarrusel();
    });

    btnSiguiente.addEventListener("click", () => {
      this.indiceSlide++;

      if (this.indiceSlide >= this.slides.length) {
        this.indiceSlide = 0;
      }

      this.actualizarCarrusel();
    });
  }

  actualizarCarrusel() {
    const titulo = document.getElementById("tituloCarrusel");
    const texto = document.getElementById("textoCarrusel");
    const carrusel = document.querySelector(".carrusel-dinamico");

    if (!titulo || !texto || !carrusel) {
      return;
    }

    carrusel.classList.add("carrusel-salida");

    setTimeout(() => {
      titulo.textContent = this.slides[this.indiceSlide].titulo;
      texto.textContent = this.slides[this.indiceSlide].texto;

      carrusel.classList.remove("carrusel-salida");
      carrusel.classList.add("carrusel-entrada");

      setTimeout(() => {
        carrusel.classList.remove("carrusel-entrada");
      }, 400);
    }, 250);
  }

  configurarCalculadora() {
    const boton = document.getElementById("btnCalcular");
    const servicio = document.getElementById("servicioSelect");
    const cantidad = document.getElementById("cantidadInput");
    const resultado = document.getElementById("resultadoTotal");

    if (!boton || !servicio || !cantidad || !resultado) {
      return;
    }

    boton.addEventListener("click", () => {
      const precio = Number(servicio.value);
      const personas = Number(cantidad.value);
      const total = this.calcularTotal(precio, personas);

      resultado.textContent = `Total: $${total}`;
      resultado.classList.add("animacion-respuesta");

      setTimeout(() => {
        resultado.classList.remove("animacion-respuesta");
      }, 600);
    });
  }

  calcularTotal(precio, cantidad) {
    return precio * cantidad;
  }

  configurarScroll() {
    const elementos = document.querySelectorAll(".elemento-scroll");

    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible-scroll");
        }
      });
    }, {
      threshold: 0.2
    });

    elementos.forEach(elemento => {
      observador.observe(elemento);
    });
  }

  configurarModoVisual() {
    const boton = document.getElementById("btnModo");

    if (!boton) {
      return;
    }

    boton.addEventListener("click", () => {
      document.body.classList.toggle("modo-alterno");

      if (document.body.classList.contains("modo-alterno")) {
        boton.textContent = "Volver a modo normal";
      } else {
        boton.textContent = "Cambiar modo visual";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sitio = new SitioDinamico();
  sitio.iniciar();
});