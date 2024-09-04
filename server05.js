
//SERVIDOR QUE CAPTURA PARAMETROS Y LOS INCRUSTA EN UNA PÁGINA HTML

import { createServer } from 'http';
import { parse } from 'url';
import { promises as fs } from 'fs';
import { join } from 'path';

const servidor = createServer((pedido, respuesta) => {
  // Parsea la URL para obtener los parámetros
  const parametros = parse(pedido.url, true).query;

  // Obtén los valores de los parámetros (si existen)
  const nombre = parametros.nombre || 'Invitado';
  const apellido = parametros.apellido || '';
  const edad=parametros.edad || '';

  // Ruta del archivo HTML existente
  const filePath = join(__dirname, 'bienvenida.html');

  // Lee el contenido del archivo HTML y procesa la respuesta
  fs.readFile(filePath, 'utf-8')
    .then(contenidoHtml => {
      // Reemplaza las etiquetas especiales en el HTML con los valores de los parámetros
      const paginaHtml = contenidoHtml
        .replace('{{nombre}}', nombre)
        .replace('{{apellido}}', apellido)
        .replace('{{edad}}', edad);

      // Configura los encabezados de la respuesta
      respuesta.writeHead(200, { 'Content-Type': 'text/html' });

      // Envía la página HTML con los valores incrustados
      respuesta.end(paginaHtml);
    })
    .catch(error => {
      // Maneja errores de lectura del archivo
      respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
      respuesta.end('Error interno del servidor');
    });
});

const PORT = 3010;
servidor.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

