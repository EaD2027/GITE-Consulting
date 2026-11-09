/* GITE — Publicaciones científicas.
   Completá las listas con referencias VERIFICADAS. No agregues datos supuestos.
   Campos: titulo, autores, anio, referencia, resumen, url, enlaceTexto.
   Para ponencias: referencia = nombre del congreso, lugar y fecha.
   Para informes: referencia = serie, institución o tipo de documento.
   url puede ser un enlace HTTPS o la ruta local a un PDF dentro del repositorio.
   Ejemplo de estructura (NO es una publicación real):
   {
     titulo: "Título real del trabajo",
     autores: "Apellido, N.; Apellido, N.",
     anio: "2026",
     referencia: "Revista o congreso · volumen, páginas",
     resumen: "Breve descripción opcional",
     url: "https://doi.org/...",
     enlaceTexto: "Ver publicación"
   }
*/
window.GITE_PUBLICACIONES = {
  articulos: [],
  ponencias: [],
  informes: []
};
