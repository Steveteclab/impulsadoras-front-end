import { BASE_URL } from './config'; // eliminar

// Determina el entorno actual (por ejemplo, a través de una variable de entorno NODE_ENV)
const isDevelopment = process.env.NODE_ENV === 'development';

// Usa la URL base correspondiente al entorno
const BASE_URL = isDevelopment ? DEV_BASE_URL : PROD_BASE_URL;

// Escuchar el evento de envío del formulario
document.getElementById('formAuthentication').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Construir la URL completa para la solicitud
    const loginUrl = `${BASE_URL}/api/login`;

    // Enviar las credenciales al servidor en formato JSON
    fetch(`${loginUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // El inicio de sesión fue exitoso, el servidor devolvió un token
            // Almacena el token en sessionStorage
            sessionStorage.setItem("token", data.token);

            // Redirige al usuario a index.html
            window.location.href = "index.html";
        } else {
            // El inicio de sesión falló, el servidor devolvió un mensaje de error
            alert('Inicio de sesión fallido. ' + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});