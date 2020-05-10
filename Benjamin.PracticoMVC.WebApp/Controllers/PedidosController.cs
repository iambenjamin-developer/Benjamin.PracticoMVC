using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class PedidosController : Controller
    {

        public ActionResult MisPedidos()
        {
            return View();

        }

        public JsonResult JsonMisPedidos()
        {
            int idCliente = Convert.ToInt32(Session["ID_CLIENTE"]);

            var metodos = new AccesoDatos.Pedidos();

            var lista = metodos.MisPedidos(idCliente);


            return (Json(lista, JsonRequestBehavior.AllowGet));

        }

        public ActionResult Carrito(int idPedido)
        {
            //numero de pedido
            ViewBag.idPedido = idPedido;

            return View();
        }

        public JsonResult JsonObtenerDetallesPedido(int idPedido)
        {

            var metodos = new AccesoDatos.Pedidos();

            var lista = metodos.ListaDetallePedido(idPedido);


            return (Json(lista, JsonRequestBehavior.AllowGet));

        }

        public int Recalcular(Entidades.DetallesPedidos obj)
        {
            var metodos = new AccesoDatos.Pedidos();
            //int idPedido, int nroItem, int cantidad

            int filasAfectadas = metodos.CalcularPrecioSegunCantidad(obj.ID_PEDIDO, obj.ITEM, obj.CANTIDAD);


            return filasAfectadas;
        }

        public int EliminarItemPedido(Entidades.DetallesPedidos obj)
        {
            var metodos = new AccesoDatos.Pedidos();

            //   int idPedido, int nroItem


            int filasAfectadas = metodos.EliminarItemPedido(obj.ID_PEDIDO, obj.ID_PRODUCTO);

            return filasAfectadas;
        }


        public int AgregarAlCarrito(Entidades.TIPO_DATO obj)
        {

            int idProducto = obj.ENTERO;
            int idCliente = Convert.ToInt32(Session["ID_CLIENTE"]);

            var metodos = new AccesoDatos.Pedidos();
            //int idPedido, int nroItem, int cantidad

            int cantidadItemsCarrito = metodos.AgregarAlCarrito(idCliente, idProducto);


            return cantidadItemsCarrito;
        }


        public int VerCantidadProductosEnCarrito()
        {

            int idCliente = Convert.ToInt32(Session["ID_CLIENTE"]);

            var metodos = new AccesoDatos.Pedidos();

            int cantidadProductosEnCarrito = metodos.VerCantidadProductosEnCarrito(idCliente);

            return cantidadProductosEnCarrito;
        }

        public ActionResult PedidosClientes()
        {
            return View();
        }

        public JsonResult JsonPedidosClientes()
        {

            var metodos = new AccesoDatos.Pedidos();

            var lista = metodos.ListarPedidosClientes();


            return (Json(lista, JsonRequestBehavior.AllowGet));

        }

        public ActionResult DetallesPedidos(int idPedido, int idCliente)
        {
            ViewBag.idPedido = idPedido;
            ViewBag.idCliente = idCliente;

            return View();

        }

        public JsonResult JsonDetallesPedidos(int idPedido, int idCliente)
        {

            var metodos = new AccesoDatos.Pedidos();

            var lista = metodos.ListaDetallePedido(idPedido);


            return (Json(lista, JsonRequestBehavior.AllowGet));

        }

        public JsonResult JsonDetallesPedidoCliente(int idPedido, int idCliente)
        {
           
            var metodos = new AccesoDatos.Pedidos();

            var obj = metodos.ObtenerDetallePedidoCliente(idPedido, idCliente);


            return (Json(obj, JsonRequestBehavior.AllowGet));

        }

    }
}