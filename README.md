# El Guardián de la Interfaz

Aplicación web de una sola página que permite personalizar el aspecto de la web y recuerda la configuración del usuario con cookies, incluso al cerrar el navegador o recargar.

**Demo:** https://irenepm777.github.io/guardian-interfaz/

## Funcionalidades

- **Bienvenida dinámica:** si el usuario ya se registró, se genera un `H2` y un párrafo con `createElement()` y se inyectan con `appendChild()`.
- **Personalización inmediata:** el color de fondo cambia al instante y el tema claro/oscuro se gestiona con clases CSS (`classList`).
- **Persistencia con cookies:** nombre y color caducan a los 7 días; el tema es cookie de sesión.
- **Restablecer interfaz:** borra las cookies (fecha de caducidad pasada), devuelve el aspecto por defecto y elimina la bienvenida del DOM.

## Estructura

```
├── .github/workflows/jsdoc.yml   # Action que genera la documentación
├── docs/                         # Web publicada en GitHub Pages
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── jsdoc/                        # Documentación generada (no se publica)
```

## Documentación

La documentación JSDoc se genera automáticamente en `jsdoc/` con cada cambio en `docs/script.js`. Para generarla a mano:

```bash
npx jsdoc docs/script.js -d jsdoc
```

## Uso en local

Abrir `docs/` con **Live Server** (las cookies no funcionan con `file://`).