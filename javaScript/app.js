let rutas = [];

let modoEdicion = false;
let idEditando = null;
let idRutaEditando = null;

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
const contenedorInputRuta = document.getElementById('contenedor-input-ruta');
const contenedorInputConductor = document.getElementById('contenedor-input-conductor');
const contendedorHoraSalida = document.getElementById('contenedor-hora-salida');

// Botones
const btnCancelar = document.getElementById('cancelarBtn');

// Elementos de estadísticas
const spanTotalRutas = document.getElementById('totalRutas');
const spanTotalEstudiantes = document.getElementById('totalEstudiantes');
const spanPromedioRuta = document.getElementById('promedioRuta');

// Obtener elementos del modal
const modal = document.getElementById('modalEditarRuta');
const modalClose = document.querySelector('.modal-close');
const modalCancelarBtn = document.getElementById('modalCancelarBtn');
const modalGuardarBtn = document.getElementById('modalGuardarBtn');





function generarId() {
    return Date.now()
}

function mostrarError(valor, contenderoValor) {
    valor.classList.add("error-input")

    const alerta = document.createElement('div')
    alerta.textContent = "⚠️ Este campo es obligatorio";
    alerta.id = "toast-nombreRuta"
    alerta.className = "toast-alerta"

    contenderoValor.appendChild(alerta)

    alerta.classList.add('mostrar');

    setTimeout(() => {
        alerta.classList.remove('mostrar');

    }, 3000);

}

function validacionesRutas() {
    let validado = true
    if (inputNombreRuta.value.trim() === "") {
        mostrarError(inputNombreRuta, contenedorInputRuta);
        validado = false
    }

    if (inputConductor.value.trim() === "") {
        mostrarError(inputConductor, contenedorInputConductor);
        validado = false
    }

    if (inputHoraSalida.value.trim() === "") {
        mostrarError(inputHoraSalida, contendedorHoraSalida);
        validado = false
    }

    return validado
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

    if (tipoformulario === formularioEstudiante) {
        const todosLosInputs = document.querySelectorAll('#formEstudiante input');
        todosLosInputs.forEach(input => {
            input.value = '';
            input.classList.remove("error-input")
        })
        console.log("Formulario de estudiantes limpiado")
    }

}

formularioRuta.addEventListener('submit', function (event) {
    event.preventDefault();// PREVENIR el envío automático del formulario


    if (validacionesRutas() === true) {

        agregarRuta()
        clear(formularioRuta)
        console.log(rutas);

    } else {
        console.log("No se pudo crear ruta")
    }
});

function agregarRuta() {
    
    const nuevoId = generarId();
    console.log("Generando nuevo ID:", nuevoId);

    const datosRuta = {
        id: generarId(),
        nombreRuta: inputNombreRuta.value,
        conductor: inputConductor.value,
        hora: inputHoraSalida.value,
        estudiantes: []
    }

    console.log("Nueva ruta a agregar:", datosRuta);

    rutas.push(datosRuta);
    console.log("Array rutas después de agregar:", rutas);

    renderRutas(rutas);
    clear(formularioRuta);


}

function renderRutas(dato_ruta) {
    
    console.log("RENDERIZAR");
    console.log("Datos a renderizar:", dato_ruta);
    
    contenedorRutas.innerHTML = "";

    dato_ruta.forEach((element, index) => {

        console.log(`Renderizando ruta ${index}:`, element);
        console.log(`ID de la ruta:`, element.id);

        const tarjeta = document.createElement("div-tarjeta");


        tarjeta.setAttribute("nombreRuta", element.nombreRuta);
        tarjeta.setAttribute("conductor", element.conductor);
        tarjeta.setAttribute("hora", element.hora);
        tarjeta.setAttribute("data-id", element.id);
        tarjeta.setAttribute("data-index", index);

        console.log(`Atributo data-id de la tarjeta:`, tarjeta.getAttribute("data-id"));

        if (element.estudiantes) {
            tarjeta.setAttribute("estudiantes", JSON.stringify(element.estudiantes));
        }


        tarjeta.addEventListener("editar-tarjeta", (e) => {
            console.log("Evento editar recibido:", e.detail);

            abrirModalEdicion(rutas)


        });


        tarjeta.addEventListener("eliminar-tarjeta", (e) => {
            console.log("Evento eliminar recibido:", e.detail);

            rutas = rutas.filter(r => r.id != e.detail.id);

            renderRutas(e.detail);

        });

        contenedorRutas.appendChild(tarjeta);
    });



}

function abrirModalEdicion(datosRuta) {
    console.log("ABRIR");
    console.log("Datos recibidos:", datosRuta);
    console.log("ID de la ruta a editar:", datosRuta.id);
    
    document.getElementById('modalEditandoId').value = datosRuta.id;
    document.getElementById('modalNombreRuta').value = datosRuta.nombreRuta;
    document.getElementById('modalConductor').value = datosRuta.conductor;
    document.getElementById('modalHoraSalida').value = datosRuta.hora;
    
    idRutaEditando = datosRuta.id;
    console.log("Variable idRutaEditando:", idRutaEditando);
    
    modal.style.display = 'flex';
}

function cerrarModal() {
    modal.style.display = 'none';


    document.getElementById('modalNombreRuta').value = '';
    document.getElementById('modalConductor').value = '';
    document.getElementById('modalHoraSalida').value = '';
    idRutaEditando = null;
}

function guardarCambiosRuta() {
    console.log("GUARDAR");
    console.log("ID que estamos editando (idRutaEditando):", idRutaEditando);
    
    const nuevoNombre = document.getElementById('modalNombreRuta').value.trim();
    const nuevoConductor = document.getElementById('modalConductor').value.trim();
    const nuevaHora = document.getElementById('modalHoraSalida').value;
    
    console.log("Nuevos valores:", { nuevoNombre, nuevoConductor, nuevaHora });
    
    
    const rutaOriginal = rutas.find(r => r.id === idRutaEditando);
    console.log("Ruta original antes de editar:", rutaOriginal);
    
    if (!nuevoNombre) {
        alert('⚠️ El nombre de la ruta es obligatorio');
        return;
    }
    
    if (!nuevoConductor) {
        alert('⚠️ El nombre del conductor es obligatorio');
        return;
    }
    
    if (!nuevaHora) {
        alert('⚠️ La hora de salida es obligatoria');
        return;
    }
    
    
    rutas = rutas.map(ruta => {
        if (ruta.id === idRutaEditando) {
            console.log("✅ Encontré la ruta a actualizar:", ruta);
            return {
                ...ruta,
                nombreRuta: nuevoNombre,
                conductor: nuevoConductor,
                hora: nuevaHora
            };
        }
        return ruta;
    });
    
    console.log("Array rutas después de actualizar:", rutas);
    
    
    const rutaActualizada = rutas.find(r => r.id === idRutaEditando);
    console.log("Ruta después de editar:", rutaActualizada);
    
    renderRutas(rutas);
    cerrarModal();
}


modalClose.addEventListener('click', cerrarModal);


modalCancelarBtn.addEventListener('click', cerrarModal);


modalGuardarBtn.addEventListener('click', guardarCambiosRuta);



const template = document.createElement("template");

template.innerHTML = `
<style>
            /* Estilos que SOLO afectan a esta tarjeta */
            .tarjeta-ruta {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 15px;
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
                    <button class="editar-btn">✏️ Editar</button>
                    <button class="eliminar-btn">🗑️ Eliminar</button>
                </div>
            </div>

            <div class="contenido">
                <div class="info">
                    <p>🚍 Conductor: <span class="conductor-texto"></span></p>
                    <p>⏰ Hora: <span class="hora-texto"></span></p>
                </div>
                <div class="lista">
                    <h4>📚 Estudiantes asignados:</h4>
                    <div class="estudiantes"></div>
                </div>
            </div>
        </div>
`

class tarjeta extends HTMLElement {

    constructor() {
        super(); // inicializamos todo el compponente
        this.attachShadow({ mode: "open" })//activamos el shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true)); // permite clonar el molde 

        this.estudiantes = [];

        this.nombreElement = this.shadowRoot.querySelector('.nombre-ruta');
        this.conductorElement = this.shadowRoot.querySelector('.conductor-texto');
        this.horaElement = this.shadowRoot.querySelector('.hora-texto');
        this.estudiantesContainer = this.shadowRoot.querySelector('.estudiantes');
        //this.inputEstudiante = this.shadowRoot.querySelector('.input-estudiante');
        //this.btnAgregarEstudiante = this.shadowRoot.querySelector('.btn-agregar-estudiante');
        this.editarBtn = this.shadowRoot.querySelector('.editar-btn');
        this.eliminarBtn = this.shadowRoot.querySelector('.eliminar-btn');

    }

    connectedCallback() {

        const nombreRuta = this.getAttribute("nombreRuta")
        const conductor = this.getAttribute("conductor")
        const hora = this.getAttribute("hora")


        this.nombreElement.textContent = nombreRuta;
        this.conductorElement.textContent = conductor;
        this.horaElement.textContent = hora;

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
    setupEventListeners() {

        this.editarBtn.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("editar-tarjeta", {
                detail: {
                    id: this.getAttribute("data-id") || this.id,
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
            const confirmar = confirm(`¿Eliminar la ruta "${this.nombreElement.textContent}"?`);
            if (confirmar) {
                this.dispatchEvent(new CustomEvent("eliminar-tarjeta", {
                    detail: {
                        id: this.getAttribute("data-id") || this.id,
                        nombre: this.nombreElement.textContent
                    },
                    bubbles: true,
                    composed: true
                }));
                this.remove(); // Eliminar del DOM
            }



        });

    }

}

customElements.define("div-tarjeta", tarjeta)