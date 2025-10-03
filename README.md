# Proyecto Tienda en Línea: Gestión de Productos con Persistencia

Este proyecto es una aplicación web simple desarrollada con **Node.js** y **Express** que simula la gestión de productos, incorporando el concepto de persistencia de datos mediante la lectura y escritura en un archivo JSON local. Utiliza **EJS** como motor de plantillas para la renderización de las vistas.

---

## 🚀 Características Principales

* **Servidor Express**: Configuración de un servidor web básico en Node.js.
* **Motor de Plantillas EJS**: Renderización dinámica de contenido HTML mediante archivos EJS.
* **Rutas Estáticas y Dinámicas**: Manejo de rutas para la página de inicio (`/`), productos estáticos (`/productos`), y gestión de productos persistentes (`/productos-db`, `/agregar-producto`).
* **Persistencia de Datos**: Los productos se guardan y leen desde el archivo local `data/productos.json`.
    * Función `leerProductos()` para cargar datos.
    * Función `guardarProductos()` para almacenar datos.
* **Formulario de Inserción**: Ruta `POST /agregar-producto` para recibir y guardar nuevos productos con validación básica de campos. Los productos incluyen `id`, `nombre`, `descripcion` y `precio`.
* **Manejo de Errores**: Implementación de *middleware* para:
    * Manejar rutas no encontradas (**Error 404**).
    * Manejar errores internos del servidor (**Error 500**) y otros errores capturados en las rutas asíncronas.
* **Contenido Estático**: Se sirven archivos estáticos como CSS e imágenes (`/img/asuka.png`) a través de una ruta estática configurada en Express.

---

## 📂 Estructura del Proyecto

* `server.js`: Archivo principal de la aplicación Express, contiene la configuración del servidor, rutas y lógica de persistencia.
* `data/productos.json`: Archivo que simula la base de datos, donde se guardan los productos de forma persistente.
* `public/css/style.css`: Hojas de estilo que definen la apariencia de la aplicación. Incluye una imagen de fondo de Asuka.
* `views/`: Directorio que contiene las plantillas EJS:
    * `index.ejs`: Página de inicio con enlaces de navegación.
    * `productos.ejs`: Vista para productos estáticos (hardcodeados en `server.js`).
    * `productos-persistencia.ejs`: Vista que muestra la lista de productos leídos de `productos.json`.
    * `formulario-producto.ejs`: Formulario para ingresar un nuevo producto.
    * `error.ejs`: Plantilla para mostrar errores (404, 500, etc.).

---

## 🛠 Tecnologías Utilizadas

* **Node.js**
* **Express.js**
* **EJS** (Embedded JavaScript)
* **Sistema de archivos (fs)** para persistencia JSON.

---

## 🏃 Rutas Disponibles

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Página principal de la tienda. |
| `GET` | `/productos` | Muestra una lista de productos estáticos (definidos en código). |
| `GET` | `/productos-db` | Muestra la lista de productos guardados en `productos.json` (persistentes). |
| `GET` | `/agregar-producto` | Muestra el formulario para añadir un nuevo producto. |
| `POST` | `/agregar-producto` | Recibe los datos del formulario, guarda el nuevo producto en `productos.json`, y redirige a `/productos-db`. |
| `GET` | `/ruta-inexistente` | Ruta para probar el manejo del Error 404. |
