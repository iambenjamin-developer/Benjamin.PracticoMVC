using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            AccesoDatos.Usuarios metodos = new AccesoDatos.Usuarios();

            int contador;

            //for (int i = 0; i < 5; i++)
            //{
            //    contador = metodos.VerificarPasswordBlanqueada("tercero");
            //}
           
    

            return View();

        }
    }
}