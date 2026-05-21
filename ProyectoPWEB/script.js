function validarDatos() {

    var nombre =
    document.getElementById("nombre").value;

    var correo =
    document.getElementById("correo").value;

    var usuario =
    document.getElementById("usuario").value;

    var password =
    document.getElementById("password").value;

    var telefono =
    document.getElementById("telefono").value;

    var edad =
    document.getElementById("edad").value;

    // VALIDAR CAMPOS VACIOS

    if (

        nombre === "" ||
        correo === "" ||
        usuario === "" ||
        password === "" ||
        telefono === "" ||
        edad === ""

    ) {

        alert("Complete todos los campos");

        return false;
    }

    // 1. VALIDAR EDAD

    if (edad <= 17) {

        alert(
            "Debe ser mayor de edad para registrarse"
        );

        return false;
    }

    // 2. VALIDAR NOMBRE SIN NUMEROS

    var regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!regexNombre.test(nombre)) {

        alert(
            "El nombre no puede contener números"
        );

        return false;
    }

    // 3. VALIDAR TELEFONO

    if (
        telefono.length !== 10
    ) {

        alert(
            "El teléfono debe tener 10 números"
        );

        return false;
    }

    // CREAR USUARIO

    var nuevoUsuario = {

        nombre,
        correo,
        usuario,
        password,
        telefono,
        edad
    };

    // OBTENER USUARIOS

    var usuarios = JSON.parse(

        localStorage.getItem("usuarios")

    ) || [];

    // AGREGAR USUARIO

    usuarios.push(nuevoUsuario);

    // GUARDAR

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

    alert("Cuenta creada correctamente");

    // REDIRECCION

    window.location.href = "login.html";

    return false;
}

function iniciarSesion() {

    var usuario =
    document.getElementById("usuario").value;

    var password =
    document.getElementById("password").value;

    // OBTENER USUARIOS

    var usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    // BUSCAR USUARIO

    for (var i = 0; i < usuarios.length; i++) {

        if (

            usuarios[i].usuario === usuario &&

            usuarios[i].password === password

        ) {

            alert("Bienvenido " + usuario);

            window.location.href =
            "principal.html";

            return false;
        }
    }

    alert("Usuario o contraseña incorrectos");

    return false;
}


// consumo de API

// VARIABLES

// VARIABLES

var mapa;

// CARGAR MAPA

function cargarMapa() {

    // CENTRO DEL MAPA

    mapa = L.map('map').setView(
        [4.142, -73.626],
        13
    );

    // MAPA OPENSTREETMAP

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {

            attribution: 'OpenStreetMap'

        }

    ).addTo(mapa);

    // OBTENER REPORTES

    var reportes = JSON.parse(
        localStorage.getItem("reportes")
    ) || [];

    // RECORRER REPORTES

    for (var i = 0; i < reportes.length; i++) {

        // SOLO ALERTAS

        if (reportes[i].estado === "ALERTA") {

            // CREAR MARCADOR

            var marcador = L.circleMarker(

                [
                    reportes[i].lat,
                    reportes[i].lng
                ],

                {

                    color: "red",

                    fillColor: "red",

                    fillOpacity: 0.8,

                    radius: 10

                }

            ).addTo(mapa);

            // POPUP

            marcador.bindPopup(

                `
                <h3>
                    🚨 ${reportes[i].titulo}
                </h3>

                <p>
                    ${reportes[i].descripcion}
                </p>

                <strong>
                    Categoría:
                </strong>

                ${reportes[i].categoria}

                <br><br>

                <strong>
                    Estado:
                </strong>

                ALERTA
                `
            );
        }
    }

    // CLICK EN MAPA

    mapa.on('click', function(e) {

        document.getElementById("latitud").value =
        e.latlng.lat;

        document.getElementById("longitud").value =
        e.latlng.lng;

        // MARCADOR TEMPORAL

        L.marker([

            e.latlng.lat,
            e.latlng.lng

        ]).addTo(mapa);

    });
}

// CREAR REPORTE

function crearReporte() {

    var titulo = document.getElementById("titulo").value;

    var descripcion = document.getElementById("descripcion").value;

    var estado = document.getElementById("estado").value;

    var lat = document.getElementById("latitud").value;

    var lng = document.getElementById("longitud").value;

    // VALIDACIÓN
    if (
        titulo === "" ||
        descripcion === "" ||
        lat === "" ||
        lng === ""
    ) {

        alert("Complete todos los datos");

        return false;
    }

    // COLOR SEGÚN ESTADO
    var color;

    if (estado === "ALERTA") {

        color = "red";

    } else {

        color = "green";
    }

    // MARCADOR
    var marcador = L.circleMarker([lat, lng], {

        color: color,
        radius: 10

    }).addTo(mapa);

    // POPUP
    marcador.bindPopup(

        "<h3>" + titulo + "</h3>" +

        "<p>" + descripcion + "</p>" +

        "<strong>Estado:</strong> " + estado

    );

    // MOSTRAR REPORTE EN PANEL
    document.getElementById("listaReportes").innerHTML += `

    <div class="reporte">

        <h3>${titulo}</h3>

        <p>${descripcion}</p>

        <span class="estado">
            ${estado}
        </span>

    </div>

    `;

    // LIMPIAR FORMULARIO
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("latitud").value = "";
    document.getElementById("longitud").value = "";

    alert("Reporte creado correctamente");

    return false;
}

// BIENVENIDA

function bienvenida() {

    alert("Bienvenido al sistema de reportes ciudadanos");

}

function crearReporte() {

    var titulo = document.getElementById("titulo").value;
    var descripcion = document.getElementById("descripcion").value;

    var lista = document.getElementById("listaReportes");

    lista.innerHTML += `
    
    <div class="reporte">

        <h3>${titulo}</h3>

        <p>${descripcion}</p>

        <span>Pendiente</span>

    </div>
    
    `;
}

// GUARDAR REPORTES

var reportes = JSON.parse(
    localStorage.getItem("reportes")
) || [];

// CREAR REPORTE

function crearReporte() {

    var titulo =
    document.getElementById("titulo").value;

    var descripcion =
    document.getElementById("descripcion").value;

    var categoria =
    document.getElementById("categoria").value;

    var estado =
    document.getElementById("estado").value;

    var lat =
    document.getElementById("latitud").value;

    var lng =
    document.getElementById("longitud").value;

    // OBJETO

    var reporte = {

        titulo,
        descripcion,
        categoria,
        estado,
        lat,
        lng
    };

    // GUARDAR

    reportes.push(reporte);

    localStorage.setItem(
        "reportes",
        JSON.stringify(reportes)
    );

    // MOSTRAR

    mostrarReportes();

    alert("Reporte creado");

    return false;
}

// MOSTRAR REPORTES

function mostrarReportes() {

    var lista =
    document.getElementById("listaReportes");

    if (!lista) return;

    lista.innerHTML = "";

    for (var i = 0; i < reportes.length; i++) {

        lista.innerHTML += `

        <div class="reporte">

            <h3>
                ${reportes[i].titulo}
            </h3>

            <p>
                ${reportes[i].descripcion}
            </p>

            <span class="estado">

                ${reportes[i].estado}

            </span>

        </div>

        `;
    }
}

// MOSTRAR ALERTAS

// MOSTRAR ALERTAS

function mostrarAlertas() {

    var contenedor =
    document.getElementById("contenedorAlertas");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    // OBTENER REPORTES

    var reportes = JSON.parse(
        localStorage.getItem("reportes")
    ) || [];

    // RECORRER

    for (var i = 0; i < reportes.length; i++) {

        // SOLO ALERTAS

        if (reportes[i].estado === "ALERTA") {

            contenedor.innerHTML += `

            <div class="reporte">

                <h3>
                    🚨 ${reportes[i].titulo}
                </h3>

                <p>
                    ${reportes[i].descripcion}
                </p>

                <p>
                    Categoría:
                    ${reportes[i].categoria}
                </p>

                <span class="estado alerta">

                    ALERTA

                </span>

                <br><br>

                <button onclick="solucionarReporte(${i})">

                    Marcar como solucionado

                </button>

            </div>

            `;
        }
    }
}

// MOSTRAR SOLUCIONADOS

function mostrarSolucionados() {

    var contenedor =
    document.getElementById(
        "contenedorSolucionados"
    );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    // OBTENER REPORTES

    var reportes = JSON.parse(
        localStorage.getItem("reportes")
    ) || [];

    // RECORRER

    for (var i = 0; i < reportes.length; i++) {

        // SOLO SOLUCIONADOS

        if (
            reportes[i].estado ===
            "SOLUCIONADO"
        ) {

            contenedor.innerHTML += `

            <div class="reporte">

                <h3>
                    ✅ ${reportes[i].titulo}
                </h3>

                <p>
                    ${reportes[i].descripcion}
                </p>

                <p>
                    Categoría:
                    ${reportes[i].categoria}
                </p>

                <span class="estado solucionado">

                    SOLUCIONADO

                </span>

            </div>

            `;
        }
    }
}

// CAMBIAR ESTADO

function solucionarReporte(indice) {

    // OBTENER REPORTES

    var reportes = JSON.parse(
        localStorage.getItem("reportes")
    ) || [];

    // CAMBIAR ESTADO

    reportes[indice].estado =
    "SOLUCIONADO";

    // GUARDAR

    localStorage.setItem(
        "reportes",
        JSON.stringify(reportes)
    );

    // RECARGAR ALERTAS

    mostrarAlertas();

    alert("Reporte solucionado");
}