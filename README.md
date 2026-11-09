# GITE — Sitio web académico del grupo de investigación

Sitio estático, responsive y en español, listo para alojar en **GitHub Pages**. No requiere Node, base de datos ni instalación.

## Archivos

- `index.html`: página principal, con accesos clicables a las tres categorías de publicaciones.
- `articulos-cientificos.html`: listado de artículos científicos.
- `ponencias-comunicaciones.html`: listado de ponencias y comunicaciones.
- `informes-documentos.html`: listado de informes y documentos.
- `publicaciones.js`: archivo editable con las referencias bibliográficas de las tres categorías.
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

**Contenidos:** los textos presentan líneas de investigación y espacios para proyectos; no afirman proyectos, resultados o publicaciones que no se hayan documentado. Las secciones Proyectos y Producción científica contienen categorías y marcadores de posición, no proyectos o artículos atribuidos al grupo. Sumá integrantes, producciones científicas, publicaciones y casos cuando dispongas de la información verificable.

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

## Identidad de GITE

Esta versión está dedicada exclusivamente al **grupo de investigación**. Se eliminó la consultoría de la navegación, los textos, los metadatos y las opciones de contacto. Los proyectos y las publicaciones se presentan como espacios por completar, sin atribuir investigaciones o resultados no verificados.

Para incorporar proyectos reales, editar la sección `id="proyectos"` en `index.html`; para agregar publicaciones verificadas, editar `id="publicaciones"`.

## Pertenencia institucional de GITE

GITE desarrolla sus actividades en el ámbito de la **Dirección de Educación a Distancia de la Facultad Regional Buenos Aires de la Universidad Tecnológica Nacional (UTN.BA)**. Esta pertenencia figura en el encabezado, la presentación inicial, la sección **Sobre GITE / Identidad institucional**, los metadatos y el pie de página.

**Actualización prevista para 2027:** el usuario indicó que la Dirección pasará a denominarse «Dirección de Educación Digital, Investigación y Vinculación Tecnológica». El sitio **mantiene la denominación vigente** hasta la formalización del cambio. Una vez aprobado, actualizá las referencias de la Dirección en `index.html` y, si corresponde, `README.md`.


## Agregar publicaciones

Abrí `publicaciones.js` y añadí entradas en cualquiera de las tres listas (`articulos`, `ponencias`, `informes`). Las páginas mostrarán automáticamente las fichas con título, autores, año, referencia y enlace. Los campos `resumen`, `url` y `enlaceTexto` son opcionales.

```js
window.GITE_PUBLICACIONES = {
  articulos: [
    {
      titulo: "Título real del artículo",
      autores: "Apellido, Nombre; Apellido, Nombre",
      anio: "2026",
      referencia: "Nombre de la revista, volumen(número), páginas",
      resumen: "Síntesis breve, opcional.",
      url: "https://doi.org/DOI-REAL",
      enlaceTexto: "Ver artículo"
    }
  ],
  ponencias: [],
  informes: []
};
```

**Nota:** el ejemplo anterior es demostrativo y no representa una publicación real. El archivo entregado mantiene las tres listas vacías. No se atribuyen publicaciones a GITE sin referencias verificadas.

Podés subir PDF al repositorio dentro de `assets/documentos/`, y colocar una ruta como `assets/documentos/mi-informe.pdf` en el campo `url`. Los enlaces externos deben utilizar HTTPS.

Para publicar la versión nueva, reemplazá los archivos de tu repositorio, incluyendo las **tres páginas HTML nuevas** y `publicaciones.js`.


## Referencias históricas incorporadas (noviembre de 2026)

Se incorporó en `publicaciones.js` el trabajo de Brito, Reyes y Rodríguez (2024), «Protocolo para Modalidades de Enseñanza Híbrida: Consideraciones Tecnopedagógicas», correspondiente a CICE 2024, p. 108. Fuente histórica: https://frba.utn.edu.ar/ead/publicaciones-academica-gite/ . Enlace al repositorio: https://ria.utn.edu.ar/items/72c253e3-b331-45d4-9591-aaea767db2c3 . Aunque figura en la página «Artículos científicos» por criterio de organización del sitio, es un trabajo de congreso y no un artículo de revista. El repositorio no permitió verificar metadatos adicionales en esta revisión.

## Publicaciones históricas incorporadas

En `publicaciones.js` se incluyen dos trabajos de congreso recuperados de la página histórica de UTN.BA: CICE 2024 (Brito, Reyes y Rodríguez) y TE&ET 2025 (Bassani, Reyes, Brito y Rodríguez). Los enlaces llevan a los repositorios originales. Se distinguen de los artículos de revista en las referencias.
