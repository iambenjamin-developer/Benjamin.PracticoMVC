tablaDetallePedido();
tablaMisPedidos();

function tablaMisPedidos() {

    $.get("/Pedidos/VerMisPedidos/?idCliente=" + 1000, function (data) {

        var total = 0;
        var contenido = "";

        contenido += "<table id='tabla-paginacion-usuarios' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";
        contenido += "<th scope='col'>NRO PEDIDO</th>";
        contenido += "<th scope='col' class='text-center'>FECHA</th>";
        contenido += "<th scope='col' class='text-center' >&nbsp;&nbsp;&nbsp;&nbsp;OBSERVACIONES</th>";
        contenido += "<th scope='col' class='text-center'>DETALLES</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<tr>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].ID_PEDIDO + "</td>";
            nroPedido = parseInt(data[i].ID_PEDIDO);

            contenido += "<td class='text-center'>" + parsearFecha(data[i].FECHA_PEDIDO) + "</td>";


            contenido += "<td class='text-center'>" + data[i].OBSERVACIONES + "</td>";

            contenido += "<td class='text-center' ><button id='btnDetalles' class='btn btn-primary' onclick='detallesPedido(" + nroPedido + ")' ><i class='fas fa-info-circle'></i></button></td>";

            contenido += "</tr>";
        }

        contenido += "</tbody>";

        contenido += "</table>";


        document.getElementById("tabla-mispedidos").innerHTML = contenido;



    });



}


function tablaDetallePedido() {

    $.get("/Pedidos/ObtenerDetallesPedido/?idPedido=" + 1, function (data) {

        var total = 0;
        var contenido = "";

        contenido += "<table id='tabla-paginacion-usuarios' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";
        contenido += "<th scope='col'>ITEM</th>";
        contenido += "<th scope='col' class='text-center'>PRODUCTO</th>";
        contenido += "<th scope='col' class='text-right' >&nbsp;&nbsp;&nbsp;&nbsp;PRECIO UNITARIO</th>";
        contenido += "<th scope='col' class='text-center' >&nbsp;&nbsp;&nbsp;&nbsp;CANTIDAD</th>";
        contenido += "<th scope='col' class='text-right' >&nbsp;&nbsp;&nbsp;&nbsp;SUBTOTAL</th>";
        contenido += "<th scope='col' class='text-center'>ELIMINAR</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<tr>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].ITEM + "</td>";
            nroItem = parseInt(data[i].ITEM);
            contenido += "<td class='text-center' >" + data[i].MARCA + " - " + data[i].PRODUCTO + "</td>";
            contenido += "<td class='text-right'>" + parsearMoneda(data[i].PRECIO_UNITARIO) + "</td>";
            // contenido += "<td class='text-right'>" + data[i].CANTIDAD + "</td>";
            contenido += "<td class='text-center'> <input id='numCantidad' type='number'  min='1' step='1' value='" + data[i].CANTIDAD + "'> </td>";
            contenido += "<td class='text-right'>" + parsearMoneda(data[i].SUBTOTAL) + "</td>";
            //calcular el total con los subtotales
            total = total + data[i].SUBTOTAL;
            contenido += "<td class='text-center' ><button id='btnEliminar' class='btn btn-danger' onclick='eliminarItem(" + nroItem + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-trash-alt'></i></button></td>";

            contenido += "</tr>";
        }

        contenido += "</tbody>";

        contenido += "<tfoot>";
        contenido += "<tr>";
        contenido += "<th>&nbsp;</th>";
        contenido += "<th>&nbsp;</th>";
        contenido += "<th>&nbsp;</th>";
        contenido += "<th>&nbsp;</th>";
        contenido += "<th class='text-right' >&nbsp;TOTAL: " + parsearMoneda(total) + "</th>";
        contenido += "<th>&nbsp;</th>";
        contenido += "</tr>";
        contenido += "</tfoot>";

        contenido += "</table>";


        document.getElementById("tabla-pedidos").innerHTML = contenido;



    });



}

function eliminarItem(nroItem) {

    alert(nroItem);
}

function parsearMoneda(decimal) {

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(decimal);
}

function parsearFecha(fecha) {


    if (fecha != null) {

        moment.locale("es");

        return moment(fecha).format('L');

    } else {

        return "No Aplica";
    }

}

function detallesPedido(nroPedido) {

    alert(nroPedido);
}