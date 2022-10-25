const form = document.getElementById("form");
const formCancha = document.getElementById("formCancha");
const formFecha = document.getElementById("formFecha");
const formHora = document.getElementById("formHora");
const formNombre = document.getElementById("formNombre");
const formCorreo = document.getElementById("formCorreo");

const precioLUMAMI = 10000;
const precioJUVI = 15000;

// -----------------------------------------------------
// 01 - LISTA DE CANCHAS EXISTENTES
// -----------------------------------------------------

// -> 01.a) CREACIÓN
let listaCanchas = [
    {ID:123, nombre:"LOS CASTAÑOS", img: "https://mail.cdn.wpchile.com/assets/img-temp/300x300/img1.jpg"},
    {ID:456, nombre:"LOS ABEDULES", img: "https://mail.cdn.wpchile.com/assets/img-temp/300x300/img2.jpg"},
    {ID:789, nombre:"LOS BOLDOS", img: "https://mail.cdn.wpchile.com/assets/img-temp/300x300/img3.jpg"},
]
// -> 01.b) ORDENAMIENTO ALFABÉTICO
listaCanchas.sort((a,b) => {
    if (a.nombre > b.nombre){
        return 1;
    } else if (a.nombre < b.nombre){
        return -1;
    } else {
        return 0;
    }
})

// -----------------------------------------------------
// 02 - PUBLICAR CANCHAS EN HTML
// -----------------------------------------------------

// -> 02.a) SECCION NFORMATIVA
listaCanchas.forEach(cancha => {
    let contenedorCancha = document.createElement("div");
    contenedorCancha.className = "cancha"; //Asigno clase para luego trabajar con todos las canchas.
    contenedorCancha.setAttribute("ID", cancha.ID); //Asigno id para luego trabajar con la cancha específica.
    contenedorCancha.innerHTML = `
        <h3>CANCHA "${cancha.nombre}"</h3>
        <p>Código = ${cancha.ID}</p>
        <img src="${cancha.img}">
        `;
    document.getElementById("seccionCanchas").append(contenedorCancha);
})

// -> 02.b) FORMULARIO
listaCanchas.forEach(cancha => {
    let opcionCancha = document.createElement("option");
    opcionCancha.innerHTML = `<option>${cancha.nombre}</option>`;
    document.getElementById("formCancha").append(opcionCancha);
})

// -----------------------------------------------------
// 03 - LISTA DE DÍAS Y PRECIOS
// -----------------------------------------------------
const listaDiasPrecios = [
    {dia:1, nombre:"LUNES", precio: precioLUMAMI},
    {dia:2, nombre:"MARTES", precio: precioLUMAMI},
    {dia:3, nombre:"MIERCOLES", precio: precioLUMAMI},
    {dia:4, nombre:"JUEVES", precio: precioJUVI},
    {dia:5, nombre:"VIERNES", precio: precioJUVI},
]

// -----------------------------------------------------
// 04 - PUBLICAR PRECIOS EN HTML
// -----------------------------------------------------

// -> 04.a) LUNES, MARTES Y MIÉRCOLES
let contenedorPreciosLUMAMI = document.createElement("p");
contenedorPreciosLUMAMI.innerHTML = `<p>Arriendo = ${precioLUMAMI} por hora.</p>`;
document.getElementById("preciosLUMAMI").append(contenedorPreciosLUMAMI);

// -> 04.b) JUEVES Y VIERNES
let contenedorPreciosJUVI = document.createElement("p");
contenedorPreciosJUVI.innerHTML = `<p>Arriendo = ${precioJUVI} por hora.</p>`;
document.getElementById("preciosJUVI").append(contenedorPreciosJUVI);

// -----------------------------------------------------
// 05 - LISTA GLOBAL DE ARRIENDOS
// -----------------------------------------------------
const listaGlobalArriendos = [
    {arrID:0, arrCorreo:"cbalart96@gmail.com", arrNombre:"Carlos Balart", arrCanchaID:"456", arrCanchaNombre:"LOS ABEDULES", arrFecha:"2022-10-24", arrHora:"12:00", arrPrecio:10000},
    {arrID:1, arrCorreo:"cbalart96@gmail.com", arrNombre:"Carlos Balart", arrCanchaID:"456", arrCanchaNombre:"LOS ABEDULES", arrFecha:"2022-10-25", arrHora:"12:00", arrPrecio:10000},
];

// -----------------------------------------------------
// 06 - LISTA PERSONAL DE ARRIENDOS
// -----------------------------------------------------
const listaPersonalArriendos = JSON.parse(localStorage.getItem("miagenda")) || [];

// -----------------------------------------------------
// 07 - CONSTRUCTOR PARA REGISTRAR UN ARRIENDO
// -----------------------------------------------------
class arriendo{
    constructor(arrID, arrCorreo, arrNombre,arrCanchaID, arrCanchaNombre, arrFecha, arrHora, arrPrecio){
        this.arrID = arrID;
        this.arrCorreo = arrCorreo;
        this.arrNombre = arrNombre;
        this.arrCanchaID = arrCanchaID;
        this.arrCanchaNombre = arrCanchaNombre;
        this.arrFecha = arrFecha;
        this.arrHora = arrHora;
        this.arrPrecio = arrPrecio;
    }
}

// -----------------------------------------------------
// 08 - SISTEMA DE ARRIENDO
// -----------------------------------------------------
form.onsubmit = (evento)=> {
    evento.preventDefault();

// -> 08.a) VALIDACIÓN DÍA
    let diaSemana = (new Date(formFecha.value).getDay())+1;
    let validarDia = listaDiasPrecios.some(i => i.dia == diaSemana); //True = Se escoge dia entre lunes (1) y viernes (5).
    if (validarDia == false){
        Toastify({
            text: "ERROR 01: DÍA INCORRECTO",
            duration: 15000,
            close: false,
            gravity: "top",
            position: "right",
        }).showToast();
    }

// -> 08.b) VALIDACIÓN HORA
    let hora = Number(formHora.value[0]+formHora.value[1]);
    let minutos = Number(formHora.value[3]+formHora.value[4]);
    let validarHora = ((minutos==0) && (hora>=9) && (hora<=22)); //True= Se escoge hora cerrada entre 9 y 22.
    if(validarHora == false) {
        Toastify({
            text: "ERROR 02: HORA INCORRECTA",
            duration: 15000,
            close: false,
            gravity: "top",
            position: "right",
        }).showToast();
    }

// -> 08.c) VALIDACIÓN OCUPADO
    let validarOcupado = listaGlobalArriendos.some(i => (i.arrCanchaNombre == formCancha.value) && (i.arrFecha == formFecha.value) && (i.arrHora == formHora.value)); //False = Existe disponibilidad para esa cancha en ese día y hora.
    if(validarOcupado == true) {
        Toastify({
            text: "ERROR 03: CUPO NO DISPONIBLE",
            duration: 15000,
            close: false,
            gravity: "top",
            position: "right",
        }).showToast();     
    }

// -> 08.d) VALIDACIONES FALLIDAS: RESETEA FORMULARIO
    if ((validarDia == false) || (validarHora ==false) || (validarOcupado == true)) {
        form.reset(); //Limpiar formulario.
    }

// -> 08.e) VALIDACIONES EXITOSAS: GENERA ARRIENDO
    if ((validarDia == true) && (validarHora ==true) && (validarOcupado == false)) {
        
        let listaids = [];
        listaGlobalArriendos.forEach(arriendo => {
            listaids.push(arriendo.arrID);
        })
        let resID = Math.max(...listaids)+1;

        let resCanchaID = listaCanchas.find(i => i.nombre == formCancha.value).ID;
        let resPrecio = listaDiasPrecios.find(i => i.dia == diaSemana).precio;

        const nuevoArriendo = new arriendo(resID, formCorreo.value, formNombre.value, resCanchaID, formCancha.value, formFecha.value, formHora.value, resPrecio);
        listaGlobalArriendos.push(nuevoArriendo); //Agregar a lista global.
        listaPersonalArriendos.push(nuevoArriendo); //Agregar a lista personal (Storage).
        localStorage.setItem("miagenda", JSON.stringify(listaPersonalArriendos));

        Swal.fire(
            {
            position: 'center',
            icon: 'success',
            title: "ARRIENDO EXITOSO",
            text: `¡Felicidades ${nuevoArriendo.arrNombre}! Hemos confirmado tu solicitud de arriendo de cancha "${nuevoArriendo.arrCanchaNombre}" para el día "${nuevoArriendo.arrFecha}" a las ${nuevoArriendo.arrHora}. Favor seguir instrucciones enviadas al correo ${nuevoArriendo.arrCorreo} para efectuar pago de $${nuevoArriendo.arrPrecio} pesos chilenos y finalizar tu reserva.`,
            showConfirmButton: false,
            timer: 15000,
            timerProgressBar: true,
            customClass: {popup: 'contSWAL',},
        })

        form.reset(); //Limpiar formulario.
    }
}