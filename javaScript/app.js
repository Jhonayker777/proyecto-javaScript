let rutas = [];
let idRutaEditando = null;

// Formularios
const formularioRuta = document.getElementById('formRuta');

// Inputs del formulario de rutas
const inputNombreRuta = document.getElementById('nombreRuta');
const inputConductor = document.getElementById('conductor');
const inputHoraSalida = document.getElementById('horaSalida');

// Contenedores
const contenedorRutas = document.getElementById('contenedorRutas');
const contenedorInputRuta = document.getElementById('contenedor-input-ruta');
const contenedorInputConductor = document.getElementById('contenedor-input-conductor');
const contendedorHoraSalida = document.getElementById('contenedor-hora-salida');

// Elementos del modal
const modal = document.getElementById('modalEditarRuta');
const modalClose = document.querySelector('.modal-close');
const modalCancelarBtn = document.getElementById('modalCancelarBtn');
const modalGuardarBtn = document.getElementById('modalGuardarBtn');

function generarId() {
    return Date.now();
}

function mostrarError(valor, contenderoValor) {
    valor.classList.add("error-input")

    const alerta = document.createElement('div')
    alerta.textContent = "Este campo es obligatorio";
    alerta.id = "toast-nombreRuta"
    alerta.className = "toast-alerta"

    contenderoValor.appendChild(alerta)

    alerta.classList.add('mostrar');

    setTimeout(() => {
        alerta.classList.remove('mostrar');
        alerta.remove();
    }, 3000);
}

function limpiarErrores() {
    const errores = document.querySelectorAll('.toast-alerta');
    errores.forEach(error => error.remove());
    
    const inputsConError = document.querySelectorAll('.error-input');
    inputsConError.forEach(input => input.classList.remove('error-input'));
}

function validaciones() {
    let validado = true;
    limpiarErrores();
    
    if (inputNombreRuta.value.trim() === "") {
        mostrarError(inputNombreRuta, contenedorInputRuta);
        validado = false;
    }

    if (inputConductor.value.trim() === "") {
        mostrarError(inputConductor, contenedorInputConductor);
        validado = false;
    }

    if (inputHoraSalida.value.trim() === "") {
        mostrarError(inputHoraSalida, contendedorHoraSalida);
        validado = false;
    }

    return validado;
}

function clear(tipoformulario) {
    if (tipoformulario === formularioRuta) {
        const todosLosInputs = document.querySelectorAll('#formRuta input');
        todosLosInputs.forEach(input => {
            input.value = '';
            input.classList.remove("error-input")
        })
        console.log("formulario de rutas limpiado")
    }
}

formularioRuta.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validaciones() === true) {
        agregarRuta();
        clear(formularioRuta);
    } else {
        console.log("No se pudo crear ruta");
    }
});

function agregarRuta() {
    const nuevoId = generarId();

    const datosRuta = {
        id: nuevoId,
        nombreRuta: inputNombreRuta.value,
        conductor: inputConductor.value,
        hora: inputHoraSalida.value,
        estudiantes: []
    };

    rutas.push(datosRuta);
    renderRutas(rutas);
}

function renderRutas(dato_ruta) {
   
    if (!contenedorRutas) {
        console.error("Contenedor de rutas no encontrado");
        return;
    }
    
    contenedorRutas.innerHTML = "";

    dato_ruta.forEach((element, index) => {
        const tarjeta = document.createElement("div-tarjeta");

        tarjeta.setAttribute("nombreRuta", element.nombreRuta);
        tarjeta.setAttribute("conductor", element.conductor);
        tarjeta.setAttribute("hora", element.hora);
        tarjeta.setAttribute("data-id", element.id);
        tarjeta.setAttribute("data-index", index);

        if (element.estudiantes && element.estudiantes.length > 0) {
            tarjeta.setAttribute("estudiantes", JSON.stringify(element.estudiantes));
        }

        tarjeta.addEventListener("editar-tarjeta", (e) => {
            abrirModalEdicion(e.detail);
        });

        tarjeta.addEventListener("eliminar-tarjeta", (e) => {
            rutas = rutas.filter(r => r.id != e.detail.id);
            renderRutas(rutas);
        });

        contenedorRutas.appendChild(tarjeta);
    });
}

function abrirModalEdicion(datosRuta) {
    if (!datosRuta || !datosRuta.id) {
        console.error("No se recibieron datos validos para editar");
        return;
    }
    
    document.getElementById('modalEditandoId').value = datosRuta.id;
    document.getElementById('modalNombreRuta').value = datosRuta.nombreRuta;
    document.getElementById('modalConductor').value = datosRuta.conductor;
    document.getElementById('modalHoraSalida').value = datosRuta.hora;
    
    idRutaEditando = datosRuta.id;
    
    modal.style.display = 'flex';
}

function cerrarModal() {
    modal.style.display = 'none';
    
    document.getElementById('modalNombreRuta').value = '';
    document.getElementById('modalConductor').value = '';
    document.getElementById('modalHoraSalida').value = '';
    document.getElementById('modalEditandoId').value = '';
    idRutaEditando = null;
}

function guardarCambiosRuta() {
    
    const nuevoNombre = document.getElementById('modalNombreRuta').value.trim();
    const nuevoConductor = document.getElementById('modalConductor').value.trim();
    const nuevaHora = document.getElementById('modalHoraSalida').value;
    
    if (!nuevoNombre) {
        alert('El nombre de la ruta es obligatorio');
        return;
    }
    
    if (!nuevoConductor) {
        alert('El nombre del conductor es obligatorio');
        return;
    }
    
    if (!nuevaHora) {
        alert('La hora de salida es obligatoria');
        return;
    }
    
    const rutaOriginal = rutas.find(r => r.id === idRutaEditando);
    
    if (!rutaOriginal) {
        console.error("No se encontro la ruta con ID:", idRutaEditando);
        alert('Error: No se encontró la ruta a editar');
        return;
    }
    
    rutas = rutas.map(ruta => {
        if (ruta.id === idRutaEditando) {
            return {
                ...ruta,
                nombreRuta: nuevoNombre,
                conductor: nuevoConductor,
                hora: nuevaHora
            };
        }
        return ruta;
    });
    
    renderRutas(rutas);
    cerrarModal();
}

if (modalClose) modalClose.addEventListener('click', cerrarModal);
if (modalCancelarBtn) modalCancelarBtn.addEventListener('click', cerrarModal);
if (modalGuardarBtn) modalGuardarBtn.addEventListener('click', guardarCambiosRuta);


// Template del Web Component
const template = document.createElement("template");
template.innerHTML = `
<style>
    .tarjeta-ruta {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 15px;
        transition: transform 0.2s;
    }
    .tarjeta-ruta:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .cabecera {
        background: #2c3e50;
        color: white;
        padding: 12px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cabecera h3 {
        margin: 0;
        font-size: 1.1rem;
    }
    .botones {
        display: flex;
        gap: 8px;
    }
    .botones button {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .botones button:hover {
        background: rgba(255,255,255,0.4);
    }
    .contenido {
        padding: 15px;
    }
    .info {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    .info p {
        margin: 5px 0;
        color: #555;
    }
    .info span {
        font-weight: 600;
        color: #2c3e50;
    }
    .lista {
        margin-top: 10px;
    }
    .lista h4 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }
    .estudiantes {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .estudiante {
        background: #ecf0f1;
        padding: 4px 10px;
        border-radius: 20px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }
    .borrar-estudiante {
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
    }
    .borrar-estudiante:hover {
        color: #c0392b;
    }
    .sin-estudiantes {
        color: #999;
        font-style: italic;
        font-size: 13px;
    }
    @media (max-width: 768px) {
        .cabecera {
            flex-direction: column;
            text-align: center;
            gap: 8px;
        }
    }
</style>

<div class="tarjeta-ruta">
    <div class="cabecera">
        <h3 class="nombre-ruta">Nombre</h3>
        <div class="botones">
            <button class="editar-btn">Editar</button>
            <button class="eliminar-btn">Eliminar</button>
        </div>
    </div>
    <div class="contenido">
        <div class="info">
            <p>Conductor: <span class="conductor-texto"></span></p>
            <p>Hora: <span class="hora-texto"></span></p>
        </div>
        <div class="lista">
            <h4>Estudiantes asignados:</h4>
            <div class="estudiantes"></div>
        </div>
    </div>
</div>
`;

class tarjeta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.estudiantes = [];
        
        this.nombreElement = this.shadowRoot.querySelector('.nombre-ruta');
        this.conductorElement = this.shadowRoot.querySelector('.conductor-texto');
        this.horaElement = this.shadowRoot.querySelector('.hora-texto');
        this.estudiantesContainer = this.shadowRoot.querySelector('.estudiantes');
        this.editarBtn = this.shadowRoot.querySelector('.editar-btn');
        this.eliminarBtn = this.shadowRoot.querySelector('.eliminar-btn');
    }
    
    connectedCallback() {
       
        const nombreRuta = this.getAttribute("nombreRuta");
        const conductor = this.getAttribute("conductor");
        const hora = this.getAttribute("hora");
        
        this.nombreElement.textContent = nombreRuta 
        this.conductorElement.textContent = conductor 
        this.horaElement.textContent = hora 
        
        const estudiantesAttr = this.getAttribute("estudiantes");
        if (estudiantesAttr) {
            try {
                this.estudiantes = JSON.parse(estudiantesAttr);
                this.actualizarListaEstudiantes();
            } catch (e) {
                console.log("Error al cargar estudiantes:", e);
                this.estudiantes = [];
            }
        }
        
        this.setupEventListeners();
    }
    
    actualizarListaEstudiantes() {
        if (!this.estudiantesContainer) return;
        
        this.estudiantesContainer.innerHTML = "";
        
        if (this.estudiantes.length === 0) {
            this.estudiantesContainer.innerHTML = '<div class="sin-estudiantes">No hay estudiantes asignados</div>';
            return;
        }
        
        this.estudiantes.forEach(estudiante => {
            const estudianteDiv = document.createElement('div');
            estudianteDiv.className = 'estudiante';
            estudianteDiv.innerHTML = `
                ${estudiante.nombre}
                <button class="borrar-estudiante" data-id="${estudiante.id}">X</button>
            `;
            
            const borrarBtn = estudianteDiv.querySelector('.borrar-estudiante');
            borrarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removerEstudiante(estudiante.id);
            });
            
            this.estudiantesContainer.appendChild(estudianteDiv);
        });
    }
    
    removerEstudiante(id) {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        this.actualizarListaEstudiantes();
        
        this.dispatchEvent(new CustomEvent("estudiante-removido", {
            detail: {
                rutaId: this.getAttribute("data-id"),
                estudiantes: this.estudiantes
            },
            bubbles: true,
            composed: true
        }));
    }
    
    setupEventListeners() {
        
        this.editarBtn.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("editar-tarjeta", {
                detail: {
                    id: parseInt(this.getAttribute("data-id")),
                    nombreRuta: this.nombreElement.textContent,
                    conductor: this.conductorElement.textContent,
                    hora: this.horaElement.textContent,
                    estudiantes: this.estudiantes
                },
                bubbles: true,
                composed: true
            }));
        });
        
        this.eliminarBtn.addEventListener("click", () => {
            const confirmar = confirm(`Eliminar la ruta "${this.nombreElement.textContent}"?`);
            if (confirmar) {
                this.dispatchEvent(new CustomEvent("eliminar-tarjeta", {
                    detail: {
                        id: parseInt(this.getAttribute("data-id")),
                        nombre: this.nombreElement.textContent
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }
}

customElements.define("div-tarjeta", tarjeta);