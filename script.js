/**
 * @file El Guardián de la Interfaz: personaliza el aspecto de la web
 * y recuerda la configuración del usuario mediante cookies
 */

const contenedor = document.getElementById("contenedor-bienvenida");
const inputColor = document.getElementById("color");
const selectTema = document.getElementById("tema");

/**
 * Crea el bloque de bienvenida (H2 + párrafo) y lo inyecta en el contenedor
 * @param {string} nombre - nombre del usuario
 */
function mostrarBienvenida(nombre) {
  const bloque = document.createElement("div");
  bloque.id = "bloque-bienvenida";

  const titulo = document.createElement("h2");
  titulo.textContent = `¡Hola, ${nombre}!`;

  const parrafo = document.createElement("p");
  parrafo.textContent = "Tus preferencias se han cargado correctamente.";

  bloque.appendChild(titulo);
  bloque.appendChild(parrafo);
  contenedor.appendChild(bloque);
}

/**
 * Aplica un color de fondo a la página.
 * @param {string} color - color en formato hexadecimal (o "" para quitarlo)
 */
function aplicarColor(color) {
  document.body.style.backgroundColor = color;
}

/**
 * Activa o desactiva la clase CSS del tema oscuro en el body
 * @param {string} tema - "claro" u "oscuro"
 */
function aplicarTema(tema) {
  if (tema === "oscuro") {
    document.body.classList.add("tema-oscuro");
  } else {
    document.body.classList.remove("tema-oscuro");
  }
}

inputColor.addEventListener("input", () => aplicarColor(inputColor.value));
selectTema.addEventListener("change", () => aplicarTema(selectTema.value));

// TEMPORAL (Fase 2): en la Fase 3 se sustituye por la lectura de la cookie
mostrarBienvenida("Usuario");