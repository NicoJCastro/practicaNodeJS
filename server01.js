// SERVIDOR QUE ENVIA INFORMACION INCRUSTADA COMO RESPUESTA A UN PEDIDO GET
// 1.  REQUERIMOS EL MODULO HTTP
import { createServer } from 'http'
// 2. ESTABLECEMOS EL PUERTO
const port = 3000
console.clear()

// 3. CREAMOS EL SERVER - PROCESAMOS EL PEDIDO Y LA RESPUESTA
const miserver = createServer(
                                   (pedido, respuesta) => {
  // 4. CAPTURAMOS EL RECURSO SOLICITADO 
  console.log(pedido.url)   
  const piden = new URL('http://localhost:3000' + pedido.url)
  //console.log(piden)
  // 5. DETERMINAMOS QUE MANDATO ES EL QUE ENVIARON
  // capturar el pedido
  if (pedido.method == 'GET') {

    if (piden.pathname === '/inicio.html') { // HTML INSCRUSTADO
      // 6. ESTABLECEMOS LAS CABECERAS DE RESPUESTA
      respuesta.setHeader('Content-Type', 'text/html; charset=utf-8')
      respuesta.writeHead(200, 'Todo ok')

      let salida = '<h1> Bienvenido a Nuestro Sitio Web de Notebooks</h1>'
      salida = salida + '<hr> Has solicitado el recurso: ' + piden.pathname + '<br>'
      
      respuesta.write(salida)

      respuesta.end()

    } else {

      respuesta.setHeader('Content-Type', 'text/html; charset=utf-8')
      respuesta.writeHead(404, 'Recurso no disponible')
      let salida = '<hr> No se encontró el recurso: ' + piden.pathname + '<br>'
      respuesta.end(salida)

    }
  }

  /*
  if (pedido.method === 'POST') {



  }
  */
  // console.log('PEDIDO RECIBIDO')

})

miserver.listen(port)
console.log('El servidor esta escuchando en el puerto: ' + port)
