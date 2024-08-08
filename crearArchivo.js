// Crear archiv txt

const fs = require('fs');
console.clear();

contenido = '';
for (i = 0; i < 10000; i++) {
    contenido += '\n' + ' línea ' + i;
} 
fs.writeFile('./archivo1.txt', contenido, error => {
    if (error)
        console.log(error)
    else
        console.log('El archivo fue creado con éxito !!!')
})
console.log('última línea del programa');

// Se puede usar Promesas

const fs2 = require('fs/promises');
console.clear();

contenido = '';
for (i = 0; i < 10000; i++) {
    contenido += '\n' + ' línea ' + i;
}
fs2.writeFile('./archivo2.txt', contenido)
    .then(() => console.log('El archivo fue creado con éxito !!!'))
    .catch(error => console.log(error))
console.log('última línea del programa');
