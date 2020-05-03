function probar() {

    //var id_usuario = document.getElementById("txt").value;
    //var id_rol = document.getElementById("txt").value;
    //var username = document.getElementById("txt").value;
    //var nombres = document.getElementById("txt").value;
    //var apellidos = document.getElementById("txt").value;
    //var razon_social = document.getElementById("txt").value;
    //var fecha_creacion = document.getElementById("txt").value;
    //var activo = document.getElementById("txt").checked;

    var hoy = new Date();
    var fechaHoy = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    alert(fechaHoy);

    var id_usuario = 66;
    var id_rol = "CLI";
    var username = "mperez";
    var nombres = "Miriam";
    var apellidos = "Perez";
    var razon_social = "La falda y asociados SRL";
    var fecha_creacion = fechaHoy;
    var activo = false;


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

                        alert(data);

                        alertify.success(data);




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