using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benjamin.PracticoMVC.AccesoDatos
{
   public class Pedidos
    {

        public List<Entidades.Join_PedidosCarrito> ListaCarrito() {

            var lista = new List<Entidades.Join_PedidosCarrito>();

            /*
SELECT 
Marcas.Nombre AS MARCA,
Productos.Nombre AS PRODUCTO,
DetallesPedidos.PrecioUnitario AS PRECIO_UNITARIO,
DetallesPedidos.Cantidad AS CANTIDAD,
(DetallesPedidos.PrecioUnitario * DetallesPedidos.Cantidad) AS SUBTOTAL
FROM DetallesPedidos
INNER JOIN Pedidos ON
DetallesPedidos.NumeroPedido = Pedidos.NumeroPedido
INNER JOIN Productos ON
DetallesPedidos.CodigoProducto = Productos.Codigo
INNER JOIN Marcas ON
Productos.IdMarca = Marcas.Id 
WHERE Pedidos.NumeroPedido = 1
ORDER BY Pedidos.Fecha DESC, DetallesPedidos.NumeroItem ASC
             */




            return lista;
        }

    }
}
