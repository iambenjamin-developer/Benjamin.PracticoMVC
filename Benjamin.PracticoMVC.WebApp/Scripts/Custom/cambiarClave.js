// validation example for Login form
$("#btnLogin").click(function (event) {

    var form = $("#loginForm");

    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    // if validation passed form
    // would post to the server here

    form.addClass('was-validated');
});



function ocultarMostrarClaveAntigua() {
    var contenido = "";
    contenido += "<label for='inputPasswordOld'>Clave Actual</label>";
    contenido += "<input type='password' class='form-control' id='inputPasswordOld' required=''>";




    var usuario = "";
    usuario = "bcorrea"

    $.ajax({
        type: "POST",
        url: "/Usuarios/ClaveBlanqueada/",
        data: usuario,
        contentType: false,
        processData: false,
        success: function (claveBlanqueada) {

            if (claveBlanqueada == 1) {
                //Si no tiene clave blanqueada (cero), va a pedir ingresar la contraseña antigua

                document.getElementById("campoClaveAntigua").innerHTML = contenido;

                //Pero si se verifica que tenia un blanqueo de clave (uno)
                //no se va a pedir que ponga la clava antigua

            } else {


            }

        }

    })

}