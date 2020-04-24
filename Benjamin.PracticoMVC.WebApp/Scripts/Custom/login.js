$(document).ready(function () {


    //SE EJECUTA DESPUES DE HACER CLIC EN EL BOTON INICIAR SESION
    $("#btnLogin").click(function () {

        //debemos compararlos con los valores de la base
        var usuario = "bcorrea";
        var clave = "1234";

        if ($("#txtUsuario").val() == usuario && $("#txtClave").val() == clave) {

            alertify.success("Bienvenido " + usuario + "(" + clave + ")");

            
            location.href = '/Usuarios/ABM/';


        } else {

            alertify.error("Usuario y/o Contraseña Incorrectos");
        }




    });


});

