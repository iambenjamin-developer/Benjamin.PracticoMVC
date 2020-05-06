
var idPedido = document.getElementById("txtIdPedido").value;

tablaDetallePedido();

function tablaDetallePedido() {


    $.get("/Pedidos/JsonObtenerDetallesPedido/?idPedido=" + idPedido, function (data) {

        var total = 0;
        var contenido = "";
        var cantidad = 0;

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
            contenido += "<td class='text-center'> <input id='txtCantidad" + data[i].ITEM + "' type='number'  min='1' step='1' value='" + data[i].CANTIDAD + "' onchange='modificarCantidad(" + data[i].ITEM + ")'> </td>";

            contenido += "<td class='text-right'>" + parsearMoneda(data[i].SUBTOTAL) + "</td>";
            //calcular el total con los subtotales
            total = total + data[i].SUBTOTAL;
            contenido += "<td class='text-center' ><button id='btnEliminar' class='btn btn-danger' onclick='eliminarItem(" + nroItem + ")' ><i class='fas fa-trash-alt'></i></button></td>";

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


        document.getElementById("tabla-detalle-pedidos").innerHTML = contenido;



    });



}

function parsearMoneda(decimal) {

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(decimal);
}


function eliminarItem(nroItem) {

    alertify.error("Pedido Nro:" + idPedido + " - Eliminar Item Nro:" + nroItem);
    ///////////////////////////

    var obj = new FormData();

    obj.append("ID_PEDIDO", idPedido);
    obj.append("ITEM", nroItem);
  



    $.ajax({
        type: "POST",
        url: "/Pedidos/EliminarItemPedido/",
        data: obj,
        contentType: false,
        processData: false,
        success: function (data) {


            var filasAfectadas = parseInt(data);

            if (filasAfectadas == 1) {

                //refrescar tabla
                tablaDetallePedido();
                alertify.success("Item eliminado");
            } else {
                alert("error");
            }


        }//fin success

    }) // fin de ajax


}


function modificarCantidad(nroItem) {
    var cantidad = document.getElementById("txtCantidad" + nroItem.toString()).value;

    //alertify.success("Pedido Nro:" + idPedido + " - Item Nro:" + nroItem + " - Cantidad: " + cantidad);

    var obj = new FormData();

    obj.append("ID_PEDIDO", idPedido);
    obj.append("ITEM", nroItem);
    obj.append("CANTIDAD", cantidad);



    $.ajax({
        type: "POST",
        url: "/Pedidos/Recalcular/",
        data: obj,
        contentType: false,
        processData: false,
        success: function (data) {

            
            var filasAfectadas = parseInt(data);

            if (filasAfectadas == 1) {

                //refrescar tabla
                tablaDetallePedido();
            } else {
                alert("error");
            }


        }//fin success

    }) // fin de ajax


}