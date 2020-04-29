setearFileInput();

function setearFileInput() {
    //sirve para plasmar el nombre del archivo q se sube en una file input
    $('.custom-file-input').on('change', function (event) {
        var inputFile = event.currentTarget;
        $(inputFile).parent()
            .find('.custom-file-label')
            .html(inputFile.files[0].name);

    });

}


mostrarTabla();

function mostrarTabla() {

    $.get("/Productos/Listar", function (data) {

        var cadenaBoolean = "";


        var contenido = "";

        contenido += "<table id='tabla-paginacion-usuarios' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";
        contenido += "<th scope='col'><i class='fas fa-sort'></i>CODIGO</th>";
        contenido += "<th scope='col'><i class='fas fa-sort'></i>NOMBRE</th>";
        contenido += "<th scope='col'><i class='fas fa-sort'></i>MARCA</th>";
        contenido += "<th scope='col' class='text-right'><i class='fas fa-sort'></i>PRECIO</th>";
        contenido += "<th scope='col'><i class='fas fa-sort'></i>ACTIVO</th>";
        contenido += "<th scope='col'>EDITAR</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<tr>";

            contenido += "<td>&nbsp;&nbsp;" + data[i].CODIGO + "</td>";
            codigo = parseInt(data[i].CODIGO);
            contenido += "<td>&nbsp;&nbsp;" + data[i].NOMBRE + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + data[i].MARCA + "</td>";
            contenido += "<td class='text-right' >" + parsearMoneda(data[i].PRECIO) + "</td>";
            contenido += "<td>&nbsp;&nbsp;" + convertirBooleanToString(data[i].ACTIVO.toString()) + "</td>";
            contenido += "<td>&nbsp;&nbsp;<button id='btnEditar' class='btn btn-primary' onclick='abrirModal(" + codigo + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-edit'></i></button></td>";


            contenido += "</tr>";
        }

        contenido += "</tbody>";
        contenido += "<tfoot>";
        contenido += "<tr>";
        contenido += "<th>&nbsp;CODIGO</th>";
        contenido += "<th>&nbsp;NOMBRE</th>";
        contenido += "<th>&nbsp;MARCA</th>";
        contenido += "<th class='text-right'>&nbsp;PRECIO</th>";
        contenido += "<th>&nbsp;ACTIVO</th>";
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


rellenarComboBox("Marcas", "Listar", "cboMarcas");

function rellenarComboBox(controlador, jsonAccion, stringID) {

    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";


    $.get(ruta, function (data) {

        //string q representa las etiquetas html
        var contenido = "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {

            contenido += "<option value='" + data[i].Id + "'>";
            contenido += data[i].Nombre;
            contenido += "</option>";
        }

        //transformar la cadena en html e insertar dentro del id del combo box
        document.getElementById(stringID).innerHTML = contenido;


    });

}


function convertirBooleanToString(cadenaBoolean) {


    if (cadenaBoolean == "true") {

        return "Activo";
    }

    if (cadenaBoolean == "false") {

        return "Baja";
    }

}


function parsearMoneda(decimal) {

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(decimal);
};


function abrirModal(id) {

    //Si el ID es cero usamos el modal para agregar
    if (id == 0) {

        //modificar titulo del modal
        document.getElementById("tituloModal").innerHTML = "Agregar Producto";


        limpiarDatos();


        //chkEstado predefinirlo activo
        document.getElementById("chkActivo").checked = true;




    }//Si el ID distinto de cero usamos el modal para editar
    else {

        document.getElementById("tituloModal").innerHTML = "Editar Producto";
   
        obtenerRegistro("Productos", "Detalle", id);
    }

}


function limpiarDatos() {
    limpiarTextBoxes();
    limpiarComboBoxes();
    limpiarFileInput();
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

function limpiarFileInput() {

}
function obtenerRegistro(controlador, jsonAccion, id) {

    //ruta = /Controlador/Accion/?id=parametro
    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";
    ruta += "?id=" + id;

    console.log(ruta);

    $.get(ruta, function (data) {


        document.getElementById("txtCodigo").value = data.Codigo;
        document.getElementById("txtNombre").value = data.Nombre;
        document.getElementById("txtDescripcion").value = data.Descripcion;
        document.getElementById("cboMarcas").value = data.IdMarca;
        document.getElementById("txtPrecioUnitario").value = data.PrecioUnitario;
        document.getElementById("chkActivo").checked = data.Activo;
        document.getElementById("imgProducto").value = data.UrlImange;
        


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


    //console.log(id);
    //console.log(usuario);
    //console.log(idRol);
    //console.log(nombres);
    //console.log(apellidos);
    //console.log(estado);


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

function resetearClave(idUsuario) {



    /*
     * @message {String or DOMElement} The dialog contents.
     * @onok {Function} Invoked when the user clicks OK button.
     * @oncancel {Function} Invoked when the user clicks Cancel button or closes the dialog.
     *
     *  alertify.confirm(message, onok, oncancel);
     *  
     * alertify.confirm('titulo','Confirm Message', function(){ alertify.success('Ok') }, function(){ alertify.error('Cancel')});
     */
    alertify.confirm('ID Usuario: ' + idUsuario, //titulo
        '¿Desear resetear la clave?', //mensaje
        function () { //cuando se presiona OK

            //obtener codigo de reset clave, si es 1 se reseteo correctamente
            //va a quedar usuario y clave iguales
            $.get("/Usuarios/CodigoResetearClave/?idUsuario=" + idUsuario, function (data) {

                if (data == 1) {
                    alertify.success('Clave reseteada con exito');
                } else {
                    alertify.error('No se realizó el reset clave');
                }

            });


        },
        function () {/* alertify.error('No se realizó el reset clave') */ }); //cuando se presiona Cancel



}




