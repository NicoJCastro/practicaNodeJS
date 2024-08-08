const PI =3.14159
function Sumar (n1, n2){
    return n1 + n2
}
function Restar (n1, n2){
    return n1 - n2
}
function Multiplicar (n1, n2){
    return n1 * n2
}
function Dividir (n1, n2){
    if(n2 == 0){
        return ErrorDivision()
    } else {
        return n1 / n2
    }    
}
function ErrorDivision(){
    return "No se puede dividir por 0"
}

exports.Sumar = Sumar
exports.Restar = Restar
exports.Multiplicar = Multiplicar
exports.Dividir = Dividir

