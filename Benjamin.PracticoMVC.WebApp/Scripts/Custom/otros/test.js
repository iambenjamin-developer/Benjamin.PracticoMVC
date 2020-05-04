function probar() {


    var hoy = new Date();
    var fechaHoy = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

    var id_usuario = document.getElementById("txtID").value;
    var id_rol = document.getElementById("cboRoles").value;
    var username = document.getElementById("txtUsuario").value;
    var apellidos = document.getElementById("txtApellidos").value;
    var nombres = document.getElementById("txtNombres").value;
    var razon_social = document.getElementById("txtRazonSocial").value;
    var fecha_creacion = fechaHoy;
    var activo = document.getElementById("chkEstado").checked;


    var objUsuarioCliente = new FormData();

    //relacionar el valor de cada elemento con la clase que le corresponde
    objUsuarioCliente.append("ID_USUARIO", id_usuario);
    objUsuarioCliente.append("ID_ROL", id_rol);
    objUsuarioCliente.append("USERNAME", username);
    objUsuarioCliente.append("NOMBRES", nombres);
    objUsuarioCliente.append("APELLIDOS", apellidos);
    objUsuarioCliente.append("RAZON_SOCIAL", razon_social);
    objUsuarioCliente.append("FECHA_CREACION", fecha_creacion);
    objUsuarioCliente.append("ACTIVO", activo);




    alertify.confirm("¿Desea Guardar cambios?", function (e) {
        if (e) {
            //after clicking OK



            $.ajax({
                type: "POST",
                url: "/Usuarios/Guardar2/",
                data: objUsuarioCliente,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {

                        mostrarTabla();

                        if (id == 0) {
                            alertify.success('Agregado exitosamente!');
                        }
                        else {
                            alertify.success('Editado exitosamente!');
                        }

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

var btnProbar = document.getElementById("btnProbar");

btnProbar.onclick = function () {

    probar();
}