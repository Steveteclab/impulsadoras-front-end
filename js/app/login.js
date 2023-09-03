// Definir la URL base como una variable global
const BASE_URL = 'http://localhost:3000';

// Función para mostrar notificaciones
function showNotification(message, isError = true) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove(isError ? 'success' : 'error');
    notification.classList.add(isError ? 'error' : 'success');
}

// Escuchar el evento de envío del formulario
document.getElementById('formAuthentication').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        // Validar si los campos de usuario y contraseña están vacíos
        showNotification('Por favor, complete todos los campos.', true);
        return;
    }

    const loginUrl = `${BASE_URL}/api/login`;

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                // Muestra el mensaje de error devuelto por la API
                showNotification(data.msg, true);
            }
        } else {
            // Maneja el error de la solicitud
            const errorData = await response.json();
            showNotification(`Error en la solicitud: ${errorData.msg}`, true);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        showNotification('Ocurrió un error en la solicitud.', true);
    }
});