/**
 * @file El Guardián de la Interfaz: personaliza el aspecto de la web
 * y recuerda la configuración del usuario mediante cookies
 */

const contenedor = document.getElementById("contenedor-bienvenida");

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

// TEMPORAL (Fase 1): en la Fase 3 se sustituye por la lectura de la cookie
mostrarBienvenida("Usuario");