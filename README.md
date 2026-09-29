# Proyecto Amor: Señora Biomecánica (Versión 3)

¡Bienvenido a la Versión 3 de la novela visual interactiva! 
Esta versión presenta una arquitectura modular para facilitar el mantenimiento y la creación de un verdadero cómic/historia ilustrada con minijuegos separados.

## Cómo abrirlo
1. Descarga el archivo `.zip` y **descomprímelo por completo** en una carpeta.
2. Haz doble clic en el archivo `index.html`.
3. Se abrirá automáticamente en tu navegador (Chrome, Edge, Firefox, etc.) sin necesidad de servidores locales ni conexión a internet.

## Cómo agregar las imágenes
La aplicación actualmente funciona al 100% con formas SVG de reemplazo y colores en lugar de imágenes. Para integrar el arte:
- Genera las imágenes utilizando los *prompts* y la guía del archivo `GUIA_IMAGENES.md`.
- Guarda cada imagen en su respectiva carpeta (`assets/characters/`, `assets/backgrounds/`, `assets/anatomy/`).
- Asegúrate de que el **nombre del archivo** coincida *exactamente* con el que indica la guía (ej. `sb_happy.png` en minúsculas).
- Al recargar la página, la aplicación automáticamente cargará tus imágenes en lugar de los reemplazos, gracias a nuestro sistema de "Cascada de Fallbacks".

## Publicar en la Web (GitHub Pages)
Si deseas publicarlo en internet:
1. Crea un repositorio en GitHub y sube todos estos archivos (incluyendo la carpeta `assets` y `js`).
2. Ve a los **Settings** (Configuración) de tu repositorio.
3. En la sección **Pages**, selecciona la rama `main` (o `master`) y la carpeta `/root`.
4. En unos minutos, tendrás un link público para compartir con tus estudiantes.

¡Disfruta el aprendizaje!
