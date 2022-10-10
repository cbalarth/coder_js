const listaCanchas = [
    {ID:123, nombre:"LOS CASTAÑOS"},
    {ID:456, nombre:"LOS ABEDULES"},
    {ID:789, nombre:"LOS BOLDOS"},
]

const listaDiasPrecios = [
    {dia:1, nombre:"LUNES", precio:10000},
    {dia:2, nombre:"MARTES", precio:10000},
    {dia:3, nombre:"MIERCOLES", precio:10000},
    {dia:4, nombre:"JUEVES", precio:15000},
    {dia:5, nombre:"VIERNES", precio:15000},
]

const listaArriendos = [
    {arrID:0, arrCorreo:"cbalart96@gmail.com", arrNombre:"Carlos Balart", arrCanchaID:"123", arrCanchaNombre:"LOS CASTAÑOS", arrFecha:"Mon Oct 10 2022", arrHorario:"12:00", arrPrecio:10000}
];

class arriendo{
    constructor(arrID, arrCorreo, arrNombre, arrCanchaID, arrCanchaNombre, arrFecha, arrHorario, arrPrecio){
        this.arrID = arrID;
        this.arrCorreo = arrCorreo;
        this.arrNombre = arrNombre;
        this.arrCanchaID = arrCanchaID;
        this.arrCanchaNombre = arrCanchaNombre;
        this.arrFecha = arrFecha;
        this.arrHorario = arrHorario;
        this.arrPrecio = arrPrecio;
    }
}

function mostrarCanchasAZ(){
    listaCanchas.sort((a,b) => {
        if (a.nombre > b.nombre){
            return 1;
        } else if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 0;
        }
    })
    listaCanchas.forEach(cancha => alert(`Cancha "${cancha.nombre}", código ${cancha.ID}.`));
}

function Arrendar(){  
    //SELECCION DE CANCHA
    let varIDCancha = document.forms["Form"]["varA"].value;
    let validarCancha = listaCanchas.some(cancha => cancha.ID == varIDCancha); //True = La cancha existe.
    while(validarCancha == false){
        alert("CÓDIGO DE CANCHA INCORRECTO O NO DISPONIBLE");
        varIDCancha = prompt("Ingrese un código de cancha válido:");
        validarCancha = listaCanchas.some(cancha => cancha.ID == varIDCancha); //True = La cancha existe.
    }
    let objetoSeleccionCancha = listaCanchas.find(cancha => cancha.ID == varIDCancha);
    alert(`CANCHA SELECCIONADA: ${objetoSeleccionCancha.nombre}`);

    //SELECCION DE DIA
    let varFecha = new Date(document.forms["Form"]["varB"].value);
    let diaSemana = varFecha.getDay();
    let validarDia = listaDiasPrecios.some(i => i.dia == diaSemana); //True = Entre lunes y viernes.
    while(validarDia == false){
        alert("DÍA INCORRECTO O NO DISPONIBLE");
        varFecha = new Date(prompt("Ingrese una fecha válida (aaaa/mm/dd): "));
        diaSemana = varFecha.getDay();
        validarDia = listaDiasPrecios.some(i => i.dia == diaSemana); //True = Entre lunes y viernes.
    }
    let seleccionDia = varFecha.toDateString();
    let objetoSeleccionPrecio = listaDiasPrecios.find(i => i.dia == diaSemana);
    alert(`DIA SELECCIONADO: ${seleccionDia}`);

    //SELECCION DE HORA
    let varHorario = document.forms["Form"]["varC"].value;
    hora = Number(varHorario[0]+varHorario[1]);
    minutos = Number(varHorario[3]+varHorario[4]);
    let validarDisponibilidad = listaArriendos.some(i => (i.arrCanchaID == varIDCancha) && (i.arrFecha == seleccionDia) && (i.arrHorario == varHorario)); //False = Hay disponibilidad para esa cancha en ese día y hora.
    while((minutos!=0) || (hora<9) || (hora>22) || (validarDisponibilidad == true)){
        alert("HORARIO INCORRECTO O NO DISPONIBLE");
        varHorario = prompt("Ingrese un horario válido (hh:00):");
        hora = Number(varHorario[0]+varHorario[1]);
        minutos = Number(varHorario[3]+varHorario[4]);
        validarDisponibilidad = listaArriendos.some(i => (i.arrCanchaID == varIDCancha) && (i.arrFecha == seleccionDia) && (i.arrHorario == varHorario)); //False = Hay disponibilidad para ese día y hora.
    }
    let seleccionHorario = varHorario;
    alert(`HORA SELECCIONADA: ${seleccionHorario}`);

    //CONFIRMACIÓN
    let varNombre = document.forms["Form"]["varD"].value;
    let varCorreo = document.forms["Form"]["varE"].value;
    const arriendo1 = new arriendo(1, varCorreo, varNombre, objetoSeleccionCancha.ID, objetoSeleccionCancha.nombre, seleccionDia, seleccionHorario, objetoSeleccionPrecio.precio);
    listaArriendos.push(arriendo1);
    alert(`¡Felicidades ${listaArriendos[1].arrNombre}! Hemos confirmado tu solicitud de arriendo de cancha "${listaArriendos[1].arrCanchaNombre}" para el día "${listaArriendos[1].arrFecha}" a las ${listaArriendos[1].arrHorario}.`);
    alert(`Favor seguir instrucciones enviadas al correo ${listaArriendos[1].arrCorreo} para efectuar pago de ${listaArriendos[1].arrPrecio} pesos chilenos y finalizar tu reserva.`);
}