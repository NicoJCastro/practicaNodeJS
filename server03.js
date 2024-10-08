// SERVIDOR QUE ENVIA MULTIPLES ARCHIVOS DE DIFERENTES TIPOS
import { createServer } from 'http'
import { stat, readFile } from 'fs/promises'

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4',
  'pdf': 'aplicacion/pdf',
  'xls': 'application/vnd.ms-excel'
}

const servidor = createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:3010' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'

  stat(camino)  // stat recorre todo el contenido de la ruta indicada leyendo los archivos
    .then(() => {
      readFile(camino)
        .then(contenido => {
          console.log(camino)
          const vec = camino.split('.')
          const extension = vec[vec.length - 1]
          const mimearchivo = mime[extension]
          respuesta.writeHead(200, { 'Content-Type': mimearchivo })
          respuesta.write(contenido)
          respuesta.end()
        })
        .catch(error => {
          respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
          respuesta.write('Error interno')
          respuesta.end()
        })
    })
    .catch(error => {
      respuesta.writeHead(404, { 'Content-Type': 'text/html' })
      respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>')
    })
})


servidor.listen(3010)

console.log('Servidor web iniciado')


