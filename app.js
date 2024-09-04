import { createServer } from 'http';
import { promises as fs } from 'fs';
import { join } from 'path';

const server = createServer((req, res) => {
    // Obtén la URL solicitada por el cliente
    const requestedUrl = req.url;

    // Si la URL es "/inicio.html", entonces envía el archivo "inicio.html"
    if (req.method=='GET'){
    if (requestedUrl === '/inicio.html') {
        const filePath = join(__dirname, 'inicio.html');
        fs.readFile(filePath)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            })
            .catch(err => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor - No se pudo leer el archivo');
            });
    } else {
        if (requestedUrl === '/index.html') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1> Esta es una página inscrustada generada por código</h1>');
        } else {
            // Si la URL no es "/inicio.html", puedes manejar otras rutas aquí
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página no encontrada');
        }
    }

    }

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});


