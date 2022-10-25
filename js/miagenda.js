const listaPersonalArriendos = JSON.parse(localStorage.getItem("miagenda")); //Reconvierte texto del Storage en array.
const seccionArriendos = document.getElementById("seccionArriendos");

if (listaPersonalArriendos == null ) {
    seccionArriendos.innerHTML = "No hay registro de arriendos."
} else {
    listaPersonalArriendos.forEach((arriendo, index) => {
        let contenedorArriendo = document.createElement("div");
        contenedorArriendo.className = "arriendo";
        contenedorArriendo.innerHTML += `
            <h3>Arriendo ${index+1}</h3>
            <p>Cancha: ${arriendo.arrCanchaNombre}</p>
            <p>Fecha: ${arriendo.arrFecha}</p>
            <p>Horario: ${arriendo.arrHora}</p><br>
        `;
        seccionArriendos.append(contenedorArriendo);
    })
}

//contenedorArriendo.setAttribute("arrID", arriendo.arrID); //Implementar a futuro, para asignar id especifico en cada div de arriendo.
//<p>Código Reserva: ${arriendo.arrID}</p> //Implementar a futuro, para mostrar dicho id específico en cada div.