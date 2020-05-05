using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class PedidosController : Controller
    {
       
        public ActionResult Carrito()
        {
            return View();
        }

        public JsonResult ObtenerDetallesPedido(int idPedido)
        {

            var metodos = new AccesoDatos.Pedidos();

            var lista = metodos.ListaDetallePedido(idPedido);


            return (Json(lista,JsonRequestBehavior.AllowGet));

        }
    }
}