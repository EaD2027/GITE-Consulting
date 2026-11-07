# GITE — Sitio web institucional

Sitio estático, responsive y en español, listo para alojar en **GitHub Pages**. No requiere Node, base de datos ni instalación.

## Archivos

- `index.html`: contenido y estructura.
- `styles.css`: identidad visual, diseño responsive y animaciones.
- `script.js`: menú móvil, tarjetas del equipo, animación de entrada y formulario de contacto.
- `equipo.js`: perfiles del equipo (nombre, función, biografía, foto, especialidades y enlaces).
- `assets/equipo/`: fotografías del equipo y avatar genérico cuando falta una imagen.
- `config.js`: configuración del correo de contacto.
- `assets/gite-logo.png`: logo proporcionado, optimizado para cabecera (fondo transparente).
- `assets/favicon.svg`: ícono de la pestaña.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub, por ejemplo `gite-web`.
2. Subí **todos los archivos y la carpeta `assets`**, respetando su estructura (el archivo `index.html` debe quedar en la raíz).
3. En el repositorio, entrá a **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**, seleccioná `main` y la carpeta `/ (root)` y guardá.
5. GitHub mostrará la URL del sitio cuando termine la publicación.

Si querés que la página abra en `https://TU_USUARIO.github.io/`, el repositorio debe llamarse `TU_USUARIO.github.io`.

## Antes de publicar: personalización recomendada

**Correo de contacto:** abrí `config.js` y completá:

```js
window.GITE_CONFIG = {
  contactEmail: "correo-real@ejemplo.com",
  subjectPrefix: "Consulta desde GITE"
};
```

El formulario **no envía datos a ningún servidor**: crea un correo precompletado con `mailto:` para que la persona lo envíe desde su aplicación de correo. Mientras no se configure el correo, intenta copiar la consulta al portapapeles (puede requerir HTTPS o permisos del navegador). Si necesitás recepción automática sin programa de correo, hay que integrar un servicio de formularios.

**Contenidos:** los textos presentan áreas de interés y servicios propuestos; no afirman proyectos, resultados o publicaciones que no se hayan documentado. La sección Perspectivas contiene temas editoriales, no artículos publicados. Sumá integrantes, producciones científicas, publicaciones y casos cuando dispongas de la información verificable.

**Logo:** el archivo original es `logo-gite.png` (puede conservarse aparte). El sitio utiliza una versión recortada y transparente, optimizada para encabezados.

**Tipografías:** usa Google Fonts (`Manrope` y `DM Sans`) con alternativas del sistema si no hay conexión.

## Probar localmente

Podés abrir `index.html` con el navegador. Para probar el formulario y el portapapeles de forma más consistente, ejecutá un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Y abrí `http://localhost:8000`.

## Accesibilidad y mantenimiento

Incluye navegación por teclado, enlace para saltar al contenido, encabezados semánticos, etiquetas de formulario, navegación móvil accesible, soporte de movimiento reducido y adaptación a celulares. La web no tiene cookies ni analítica de terceros.

## Cómo completar la sección «Equipo GITE»

1. Abrí `equipo.js` con cualquier editor de texto. Encontrarás **tres fichas de ejemplo**, claramente identificadas con nombres de muestra: no representan integrantes reales.
2. Cambiá `nombre`, `rol`, `perfil` y el listado `areas` de cada ficha.
3. Guardá la fotografía de cada integrante en `assets/equipo/`, por ejemplo `maria-perez.jpg`, y cambiá el valor de `foto` por `"assets/equipo/maria-perez.jpg"`. Recomendado: JPG o WebP, encuadre horizontal 5:4, al menos 800 × 640 px y peso menor a 300 KB. Si no hay una imagen, se mostrará un avatar neutro.
4. Para agregar integrantes, copiá uno de los objetos entre `{ ... }` y agregalo al listado separado por coma. Para quitar integrantes, eliminá el objeto correspondiente.
5. Opcionalmente completá `enlaces` con datos verificados: `[{ texto: "ORCID", url: "https://orcid.org/0000-..." }]`. Solo se admiten enlaces HTTPS y correos `mailto:`.
6. Subí los archivos modificados al mismo repositorio de GitHub. GitHub Pages actualizará la página.

La sección se adapta automáticamente a la cantidad de integrantes y funciona en dispositivos móviles. El perfil y la fotografía quedan visibles dentro de cada tarjeta, sin necesidad de hacer clic. **Antes de publicar, sustituí las fichas de ejemplo o eliminá las que no uses**.
