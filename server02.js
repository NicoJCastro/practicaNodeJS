import { createServer } from 'http';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Crear alternativa a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
    const requestedUrl = req.url;

    if (req.method === 'GET') {
        if (requestedUrl === '/inicio.html' || requestedUrl === '/') {
            const filePath = join(__dirname, 'inicio.html');
            console.log('Ruta del archivo:', filePath);

            fs.readFile(filePath)
                .then(data => {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(data);
                })
                .catch(err => {
                    console.error('Error al leer el archivo:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor - No se pudo leer el archivo');
                });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página no encontrada');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});