mostrarTabla();


function mostrarTabla() {

    $.get("/Usuarios/Listar", function (data) {

        var cadenaBoolean = "Activo---";

        var contenido = "";

        contenido += "<table id='tabla-paginacion-usuarios' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";
        contenido += "<th scope='col'>ID <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>USUARIO <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>ROL <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>NOMBRES <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>APELLIDOS <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>ESTADO <i class='fas fa-sort'></i></th>";
        contenido += "<th scope='col'>EDITAR</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<tr>";

            contenido += "<td>&nbsp;&nbsp;" + data[i].ID + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].USUARIO + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].ROL + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].NOMBRES + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].APELLIDOS + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + convertirBooleanToString(data[i].ESTADO.toString()) + "</td>";
            contenido += "<td>&nbsp;&nbsp;&nbsp;<button id='btnEditar' class='btn btn-primary' onclick='abrirModal(" + data[i].ID + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-edit'></i></button></td>";

            contenido += "</tr>";
        }

        contenido += "</tbody>";
        contenido += "<tfoot>";
        contenido += "<tr>";
        contenido += "<th>ID</th>";
        contenido += "<th>USUARIO</th>";
        contenido += "<th>ROL</th>";
        contenido += "<th>NOMBRES</th>";
        contenido += "<th>APELLIDOS</th>";
        contenido += "<th>ESTADO</th>";
        contenido += "<th>EDITAR</th>";
        contenido += "</tr>";
        contenido += "</tfoot>";
        contenido += "</table>";


        document.getElementById("tabla-usuarios").innerHTML = contenido;

        $("#tabla-paginacion-usuarios").dataTable({
            "language":
            {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla =(",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            }

        }); // fin datatable

    });



}


function convertirBooleanToString(cadenaBoolean) {

    if (cadenaBoolean == "True") {

        return "Activo";
    }
   
    if (cadenaBoolean == "False") {

        return "Baja";
    }

}

function abrirModal(id) {

    alert(id);
}