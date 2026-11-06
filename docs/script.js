/**
 * @file El Guardián de la Interfaz: personaliza el aspecto de la web
 * y recuerda la configuración del usuario mediante cookies
 */

const DIAS_CADUCIDAD = 7;
const COOKIES = ["nombre", "color", "tema"];
const COLOR_POR_DEFECTO = "#ffffff"; // mismo valor que el input de color en el HTML

const contenedor = document.getElementById("contenedor-bienvenida");
const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputColor = document.getElementById("color");
const selectTema = document.getElementById("tema");
const btnGuardar = document.getElementById("btnGuardar");
const btnRestablecer = document.getElementById("btnRestablecer");

/**
 * Elimina el bloque de bienvenida del DOM si existe
 */
function borrarBienvenida() {
  const bloque = document.getElementById("bloque-bienvenida");
  if (bloque) {
    bloque.remove();
  }
}

/**
 * Crea el bloque de bienvenida (H2 + párrafo) y lo inyecta en el contenedor
 * Si ya había uno lo sustituye; si no hay nombre, no crea nada
 * @param {string} nombre - nombre del usuario
 */
function mostrarBienvenida(nombre) {
  borrarBienvenida();
  if (!nombre) {
    return;
  }

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
 * Aplica un color de fondo a la página
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

/**
 * Guarda una cookie. Sin "dias" es una cookie de sesión (sin Expires)
 * @param {string} nombre - nombre de la cookie
 * @param {string} valor - valor a guardar
 * @param {number} [dias] - días hasta que caduca
 */
function guardarCookie(nombre, valor, dias) {
  let cookie = `${nombre}=${encodeURIComponent(valor)}; path=/`;

  if (dias) {
    const caducidad = new Date();
    caducidad.setDate(caducidad.getDate() + dias);
    cookie += `; expires=${caducidad.toUTCString()}`;
  }

  document.cookie = cookie;
}

/**
 * Lee una cookie por su nombre parseando document.cookie
 * @param {string} nombre - nombre de la cookie
 * @returns {string|null} el valor, o null si no existe
 */
function leerCookie(nombre) {
  const pares = document.cookie.split("; ");

  for (const par of pares) {
    const [clave, valor] = par.split("=");
    if (clave === nombre) {
      return decodeURIComponent(valor);
    }
  }
  return null;
}

/**
 * Elimina una cookie poniendo su fecha de caducidad en el pasado
 * @param {string} nombre - nombre de la cookie
 */
function borrarCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/**
 * Guarda nombre y color (7 días) y tema (sesión) en tres cookies
 */
function guardarPreferencias() {
  guardarCookie("nombre", inputNombre.value, DIAS_CADUCIDAD);
  guardarCookie("color", inputColor.value, DIAS_CADUCIDAD);
  guardarCookie("tema", selectTema.value);
  mostrarBienvenida(inputNombre.value);
}

/**
 * Lee las cookies guardadas, aplica el aspecto y rellena el formulario
 */
function restaurarPreferencias() {
  const nombre = leerCookie("nombre");
  const color = leerCookie("color");
  const tema = leerCookie("tema");

  if (nombre) {
    inputNombre.value = nombre;
    mostrarBienvenida(nombre);
  }
  // El color por defecto no se aplica en línea: así el tema sigue controlando el fondo
  if (color && color !== COLOR_POR_DEFECTO) {
    inputColor.value = color;
    aplicarColor(color);
  }
  if (tema) {
    selectTema.value = tema;
    aplicarTema(tema);
  }
}

/**
 * Borra las cookies y devuelve la página a su aspecto por defecto sin recargar
 */
function restablecerInterfaz() {
  for (const nombre of COOKIES) {
    borrarCookie(nombre);
  }

  formulario.reset();
  aplicarColor("");
  aplicarTema("claro");
  borrarBienvenida();
}

inputColor.addEventListener("input", () => aplicarColor(inputColor.value));
selectTema.addEventListener("change", () => aplicarTema(selectTema.value));
btnGuardar.addEventListener("click", guardarPreferencias);
btnRestablecer.addEventListener("click", restablecerInterfaz);

restaurarPreferencias();