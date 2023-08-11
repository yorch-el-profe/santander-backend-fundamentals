// Core Modules son paquetes o módulos
// que vienen incluidos en la instalación dee Nodejs

// Se utiliza una función especial llamada "require"
// para "importar" las funciones o módulos que queremos utilizar

// CommonJS
const os = require("node:os");

// ECMAScript 6
// import os from "node:os";

// Mostrar en pantalla el sistema operativo
// que este corriendo el programa
console.log(os.platform());
