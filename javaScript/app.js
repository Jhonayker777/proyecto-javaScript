let rutas = []; 

let modoEdicion = false;
let idEditando = null;


// Formularios
const formularioRuta = document.getElementById('formRuta');
const formularioEstudiante = document.getElementById('formEstudiante');

// Inputs del formulario de rutas
const inputNombreRuta = document.getElementById('nombreRuta');
const inputConductor = document.getElementById('conductor');
const inputHoraSalida = document.getElementById('horaSalida');
const inputIdEditando = document.getElementById('editandoId');

// Inputs del formulario de estudiantes
const inputNombreEstudiante = document.getElementById('nombreEstudiante');
const selectRuta = document.getElementById('selectRuta');

// Contenedores
const contenedorRutas = document.getElementById('contenedorRutas');

// Botones
const btnCancelar = document.getElementById('cancelarBtn');

// Elementos de estadísticas
const spanTotalRutas = document.getElementById('totalRutas');
const spanTotalEstudiantes = document.getElementById('totalEstudiantes');
const spanPromedioRuta = document.getElementById('promedioRuta');

function generarId(){
    return Date.now()
}
