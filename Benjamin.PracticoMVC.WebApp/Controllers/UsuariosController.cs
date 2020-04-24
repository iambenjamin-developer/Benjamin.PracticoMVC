using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class UsuariosController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }



        public JsonResult Listar()
        {
            AccesoDatos.Usuarios obj = new AccesoDatos.Usuarios();
            var lista = obj.Listar();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Detalle(int id)
        {
            AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();

            Entidades.Usuarios userSeleccionado = metodos.Detalle(id);

            return Json(userSeleccionado, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ABM()
        {

            return View();
        }


        public int Guardar(Entidades.Usuarios obj)
        {

            //si el ID es cero agregar
            if (obj.Id == 0)
            {
                AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();

                metodos.Crear(obj);


            }
            else // si el ID es distinto de cero editar
            {
                AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();



            }

            return 1;
        }


        public int ValidarLogin(Entidades.Login obj)
        {

            bool usuarioClaveIguales;

            if (obj.USUARIO == obj.CLAVE)
            {
                usuarioClaveIguales = true;
            }
            else
            {

                usuarioClaveIguales = false;
            }

            AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();


            if (metodos.ValidarLogin(obj.USUARIO, obj.CLAVE) == true)
            {
                //si el usuario y la clave son iguales, significa que esta blanqueada
                //por lo cual hay q redirigirlos a cambiar contraseña
                if (usuarioClaveIguales == true)
                {
                    return 2;
                }
                else
                {// de lo contrario si valida ok, pero son distintos user/pass ingresa normal al sistema
                    return 1;
                }


            }
            else
            {
                return 0;
            }

        }


        public ActionResult Login()
        {



            return View();
        }



        public ActionResult CambiarClave()
        {
            ClaveBlanqueada("bcorrea");

            return View();
        }


        public int ClaveBlanqueada(string usuario)
        {
            //AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();

            //int claveEnBlanco = metodos.VerificarPasswordBlanqueada(usuario);

            //return claveEnBlanco;


            return 1;
        }

    }
}