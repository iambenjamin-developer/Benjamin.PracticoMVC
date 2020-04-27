$(document).ready(function () {


    //SE EJECUTA DESPUES DE HACER CLIC EN EL BOTON GUARDAR
    $("#btnAceptar").click(function () {


        var claveActual = document.getElementById("txtClaveActual").value;
        var claveNueva = document.getElementById("txtClaveNueva").value;
        var repetirClaveNueva = document.getElementById("txtRepetirClaveNueva").value;




        console.log(claveActual);
        console.log(claveNueva);
        console.log(repetirClaveNueva);


        if (validarCampos(claveActual, claveNueva, repetirClaveNueva) == true) {

            var codigo = validarClaveActual(claveActual);

           

            console.log(codigo);

            if (codigo == 1) {

                console.log("aca llegamos");
                var frmCambiarClave = new FormData();

                //relacionar el valor de cada elemento con la clase que le corresponde
                frmCambiarClave.append("USUARIO", null);
                frmCambiarClave.append("CLAVE", claveNueva);


                $.ajax({
                    type: "POST",
                    url: "/Usuarios/CodigoCambiarClave/",
                    data: frmCambiarClave,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        if (data == 1) {
                            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
                            alertify.success("Clave cambiaada!");

                            location.href = '/Usuarios/Index/';

                        } else {
                            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión

                            alertify.error("No se pudo cambiar la clave");

                        }






                    }

                });// fin ajax


            }






        }// fin if





    });


});


function validarCampos(claveActual, claveNueva, repetirClaveNueva) {

    var contarErrores = 0;


    // Validate length
    if (claveActual.length >= 4 && claveNueva.length >= 4 && repetirClaveNueva.length >= 4) {

        if (claveNueva != repetirClaveNueva) {
            alertify.error("No coinciden las claves");
            contarErrores += 1;
        }






    } else {
        alertify.error("Claves: minimo 4 caracteres");
        contarErrores += 1;
    }






    //si hay mas de 1 error la validacion da falsa
    if (contarErrores == 0) {

        return true;

    } else {

        return false;
    }

}

function validarClaveActual(claveActual) {

    var condicion = false;

    var frm = new FormData();

    //relacionar el valor de cada elemento con la clase que le corresponde
    frm.append("USUARIO", null);
    frm.append("CLAVE", claveActual);

    console.log(claveActual);

    $.ajax({
        type: "POST",
        url: "/Usuarios/ValidarClaveActual/",
        data: frm,
        contentType: false,
        processData: false,
        success: function (data) {

            if (data == 1) {
                alertify.success("La clave actual es  correcta");

                condicion = true;

            } else {
                alertify.error("La clave actual es incorrecta");

                condicion = false;
                
            }
        }
    });// fin ajax

    console.log("condicion");
    console.log(condicion);

    return condicion;
}


