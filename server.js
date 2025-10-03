
import express from 'express';
import { promises as fs } from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
const dataFilePath = path.join(__dirname, 'data', 'productos.json');

const app = express();
const PORT = 3000;


const staticPath = path.join(__dirname, 'public');
console.log('Ruta estática utilizada por Express:', staticPath); 
app.use(express.static(staticPath)); 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function leerProductos() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error("Error al leer/parsear productos:", error.message);
        throw new Error('Fallo al cargar la base de datos de productos.');
    }
}

async function guardarProductos(productos) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(productos, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al guardar productos:", error);
        throw new Error('Fallo al guardar los datos de productos.');
    }
}


app.get('/', (req, res) => {
    res.render('index', { titulo: 'Bienvenido a la Tienda' }); 
});


app.get('/productos', (req, res) => {
    const productos = [
        { nombre: 'Laptop', precio: 1200, descripcion: 'Potente máquina de trabajo.' },
        { nombre: 'Smartphone', precio: 800, descripcion: 'Última generación móvil.' },
        { nombre: 'Auriculares', precio: 150, descripcion: 'Excelentes auriculares.',}
    ];
    res.render('productos', { listaProductos: productos, titulo: 'Productos Estáticos' });
});



app.get('/agregar-producto', (req, res) => {
    res.render('formulario-producto', { titulo: 'Agregar Producto' });
});


app.post('/agregar-producto', async (req, res, next) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        if (!nombre || !precio || isNaN(parseFloat(precio))) {
            return res.status(400).send('Error: Nombre y Precio válido son requeridos.');
        }

        const nuevoProducto = {
            id: Date.now(),
            nombre: String(nombre),
            descripcion: String(descripcion) || 'Sin descripción',
            precio: parseFloat(precio)
        };

        const productos = await leerProductos();
        productos.push(nuevoProducto);
        await guardarProductos(productos);

        res.redirect('/productos-db'); 
    } catch (error) {
        next(error); 
    }
});


app.get('/productos-db', async (req, res, next) => {
    try {
        const productos = await leerProductos();
        res.render('productos-persistencia', { listaProductos: productos, titulo: 'Productos Persistentes' });
    } catch (error) {
        next(error); 
    }
});


app.use((req, res, next) => {
    res.status(404).render('error', { 
        titulo: 'Error 404', 
        mensaje: 'La ruta solicitada no se encontró en el servidor.' 
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.status || 500;
    const message = statusCode === 500 
        ? 'Error interno del servidor. Intente más tarde.' 
        : err.message || 'Ocurrió un error inesperado.';

    res.status(statusCode).render('error', { 
        titulo: `Error ${statusCode}`, 
        mensaje: message 
    });
});


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});