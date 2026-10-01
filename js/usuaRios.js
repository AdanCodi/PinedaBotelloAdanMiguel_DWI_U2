class Usuario {

    constructor(nombre, correo) {
        this.nombre = nombre;
        this.correo = correo;
    }

    mostrarDatos() {
        return `
Nombre: ${this.nombre}
Correo: ${this.correo}
        `;
    }

}