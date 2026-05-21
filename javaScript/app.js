
"use strict";

let rutas = [];

const formularioRuta = document.getElementById('routeForm');
const entradaNombreRuta = document.getElementById('routeName');
const entradaConductor = document.getElementById('driverName');
const entradaHoraSalida = document.getElementById('departureTime');
const entradaIdEdicion = document.getElementById('editRouteId');
const botonCancelarEdicion = document.getElementById('cancelEditBtn');
const contenedorRutas = document.getElementById('routesContainer');
const selectorRuta = document.getElementById('routeSelect');
const formularioEstudiante = document.getElementById('studentForm');
const entradaNombreEstudiante = document.getElementById('studentName');

function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function validarFormularioRuta() {
    limpiarErrores();

    let esValido = true;

    if (!entradaNombreRuta.value.trim()) {
        mostrarError(entradaNombreRuta, 'El nombre de la ruta es obligatorio');
        esValido = false;
    } else if (entradaNombreRuta.value.trim().length < 3) {
        mostrarError(entradaNombreRuta, 'El nombre debe tener al menos 3 caracteres');
        esValido = false;
    }

    // Validar nombre del conductor (no vacío)
    if (!entradaConductor.value.trim()) {
        mostrarError(entradaConductor, 'El nombre del conductor es obligatorio');
        esValido = false;
    }

    // Validar hora de salida (no vacía)
    if (!entradaHoraSalida.value) {
        mostrarError(entradaHoraSalida, 'La hora de salida es obligatoria');
        esValido = false;
    }
}

function mostrarError(campo, mensaje) {
    // Agregar clase de error al campo
    campo.classList.add('error-border');
    
    // Buscar o crear el mensaje de error
    let spanError = campo.parentElement.querySelector('.error-message');
    if (!spanError) {
        spanError = document.createElement('span');
        spanError.className = 'error-message';
        spanError.style.cssText = 'color: #e74c3c; font-size: 0.75rem; margin-top: 5px; display: block;';
        campo.parentElement.appendChild(spanError);
    }
    spanError.textContent = mensaje;
}




function agregarRuta(datosRuta) {
  
    const nuevaRuta = {
        id: generarIdUnico(),
        nombre: datosRuta.nombre.trim(),
        conductor: datosRuta.conductor.trim(),
        horaSalida: datosRuta.horaSalida,
        estudiantes: [] 
    };

}