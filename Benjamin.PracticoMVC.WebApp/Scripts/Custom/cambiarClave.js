$(document).ready(function () {


    //SE EJECUTA DESPUES DE HACER CLIC EN EL BOTON GUARDAR
    $("#btnAceptar").click(function () {

       
        var claveActual = document.getElementById("txtClaveActual").value;
        var claveNueva = document.getElementById("txtClaveNueva").value;
        var claverRepetirClaveNueva = document.getElementById("txtRepetirClaveNueva").value;




        console.log(claveActual);
        console.log(claveNueva);
        console.log(claverRepetirClaveNueva);

        //colocar en una variable el valor de cada elemento




        var frm = new FormData();

        //relacionar el valor de cada elemento con la clase que le corresponde
        frm.append("USUARIO", null);
        frm.append("CLAVE", claveNueva);


        $.ajax({
            type: "POST",
            url: "/Usuarios/CodigoCambiarClave/",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {

                if (data == 1) {
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
                    alertify.success("Clave cambiaada!");

                    location.href = '/Usuarios/Index/';

                } else if (data == 2) {
                    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
                    //alertify.success("Cambiar clave " + usuario + "!");

                    //location.href = '/Usuarios/CambiarClave/';

                } else {
                    //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión

                    alertify.error("No se pudo cambiar la clave");

                }






            }

        });



    });


});




