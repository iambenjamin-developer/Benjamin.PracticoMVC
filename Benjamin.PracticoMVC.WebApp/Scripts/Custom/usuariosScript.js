mostrarTabla();

rellenarComboBox("Roles", "Listar", "cboRoles");

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
        contenido += "<th scope='col'>FECHA DE ALTA <i class='fas fa-sort'></i></th>";
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
            contenido += "<td>&nbsp;&nbsp;" + parsearFecha(data[i].FECHA_ALTA) + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + convertirBooleanToString(data[i].ESTADO.toString()) + "</td>";
            contenido += "<td>&nbsp;&nbsp;&nbsp;<button id='btnEditar' class='btn btn-primary' onclick='abrirModal(" + data[i].ID + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-edit'></i></button></td>";

            contenido += "</tr>";
        }

        contenido += "</tbody>";
        contenido += "<tfoot>";
        contenido += "<tr>";
        contenido += "<th>&nbsp;ID</th>";
        contenido += "<th>&nbsp;USUARIO</th>";
        contenido += "<th>&nbsp;ROL</th>";
        contenido += "<th>&nbsp;NOMBRES</th>";
        contenido += "<th>&nbsp;APELLIDOS</th>";
        contenido += "<th>FECHA DE ALTA</th>";
        contenido += "<th>&nbsp;ESTADO</th>";
        contenido += "<th>&nbsp;EDITAR</th>";
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

function rellenarComboBox(controlador, jsonAccion, stringID) {

    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";


    $.get(ruta, function (data) {

        //string q representa las etiquetas html
        var contenido = "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {

            contenido += "<option value='" + data[i].Id + "'>";
            contenido += data[i].Descripcion;
            contenido += "</option>";
        }

        //transformar la cadena en html e insertar dentro del id del combo box
        document.getElementById(stringID).innerHTML = contenido;


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

function parsearFecha(fecha) {


    if (fecha != null) {

        moment.locale("es");

        return moment(fecha).format('L');

    } else {

        return "No Aplica";
    }

};


function abrirModal(id) {

    //Si el ID es cero usamos el modal para agregar
    if (id == 0) {

        //modificar titulo del modal
        document.getElementById("tituloModal").innerHTML = "Agregar Usuario";

        //ocultar campo de reset clave
        document.getElementById("divResetClave").style.display = "none";


        limpiarDatos();


        //chkEstado predefinirlo activo
        document.getElementById("chkEstado").checked = true;




    }//Si el ID distinto de cero usamos el modal para editar
    else {

        document.getElementById("tituloModal").innerHTML = "Editar Usuario";
        //visualizar campo de reset clave
        document.getElementById("divResetClave").style.display = "block";

        obtenerRegistro("Usuarios", "Detalle", id);
    }

}


function limpiarDatos() {
    limpiarTextBoxes();
    limpiarComboBoxes();

}

function limpiarTextBoxes() {

    //se limpian todos los textboxes dejando un string vacio
    var controles = document.getElementsByClassName("limpiar");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = "";
    }
}

function limpiarComboBoxes() {

    //se limpian todos los comboboxes dejando string vacio
    var controles = document.getElementsByClassName("limpiarCbo");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = 0;
    }

}


function obtenerRegistro(controlador, jsonAccion, id) {

    //ruta = /Controlador/Accion/?id=parametro
    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";
    ruta += "?id=" + id;

    console.log(ruta);

    $.get(ruta, function (data) {


        document.getElementById("txtID").value = data.Id;
        document.getElementById("txtUsuario").value = data.Usuario;
        document.getElementById("cboRoles").value = data.IdRol;
        document.getElementById("txtNombres").value = data.Nombre;
        document.getElementById("txtApellidos").value = data.Apellido;
        document.getElementById("chkEstado").checked = data.Activo;


    });
}


function guardar() {


    var frm = new FormData();

    //colocar en una variable el valor de cada elemento
    var id = document.getElementById("txtID").value;
    var usuario = document.getElementById("txtUsuario").value;
    var idRol = document.getElementById("cboRoles").value;
    var nombres = document.getElementById("txtNombres").value;
    var apellidos = document.getElementById("txtApellidos").value;
    var estado = document.getElementById("chkEstado").checked;


    console.log(id);
    console.log(usuario);
    console.log(idRol);
    console.log(nombres);
    console.log(apellidos);
    console.log(estado);


    //relacionar el valor de cada elemento con la clase que le corresponde
    frm.append("Id", id);
    frm.append("Usuario", usuario);
    frm.append("IdRol", idRol);
    frm.append("Nombre", nombres);
    frm.append("Apellido", apellidos);
    frm.append("Activo", estado);





    alertify.confirm("¿Desea Guardar cambios?", function (e) {
        if (e) {
            //after clicking OK

            $.ajax({
                type: "POST",
                url: "/Usuarios/Guardar/",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {

                        mostrarTabla();

                        if (id == 0)
                            alertify.success('Agregado exitosamente!');
                        else
                            alertify.success('Editado exitosamente!');


                        document.getElementById("btnCancelar").click();


                    } else {
                        alertify.error('Error');
                    }

                }

            })







           //else de alertify despues de evento cancel 
        } else {
            //after clicking Cancel          
        }
    });// fin alertify

          
}

