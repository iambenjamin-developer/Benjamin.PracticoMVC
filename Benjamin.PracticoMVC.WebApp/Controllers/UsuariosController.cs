using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class UsuariosController : Controller
    {

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

    }
}