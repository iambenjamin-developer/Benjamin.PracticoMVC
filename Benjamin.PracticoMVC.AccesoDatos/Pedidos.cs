using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using Dapper;

namespace Benjamin.PracticoMVC.AccesoDatos
{
   public class Pedidos
    {
        string cadenaConexion = Conexiones.ObtenerCadenaConexion();

        public List<Entidades.DetallesPedidos> ListaDetallePedido(int idPedido) {

            var lista = new List<Entidades.DetallesPedidos>();


            /*
SELECT 
DetallesPedidos.NumeroItem AS ITEM,
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
ORDER BY DetallesPedidos.NumeroItem ASC
             */
            StringBuilder consultaSQL = new StringBuilder();
            consultaSQL.Append("SELECT ");
            consultaSQL.Append("DetallesPedidos.NumeroItem AS ITEM, ");
            consultaSQL.Append("Marcas.Nombre AS MARCA, ");
            consultaSQL.Append("Productos.Nombre AS PRODUCTO, ");
            consultaSQL.Append("DetallesPedidos.PrecioUnitario AS PRECIO_UNITARIO, ");
            consultaSQL.Append("DetallesPedidos.Cantidad AS CANTIDAD, ");
            consultaSQL.Append("(DetallesPedidos.PrecioUnitario * DetallesPedidos.Cantidad) AS SUBTOTAL ");
            consultaSQL.Append("FROM DetallesPedidos ");
            consultaSQL.Append("INNER JOIN Pedidos ON ");
            consultaSQL.Append("DetallesPedidos.NumeroPedido = Pedidos.NumeroPedido ");
            consultaSQL.Append("INNER JOIN Productos ON ");
            consultaSQL.Append("DetallesPedidos.CodigoProducto = Productos.Codigo ");
            consultaSQL.Append("INNER JOIN Marcas ON ");
            consultaSQL.Append("Productos.IdMarca = Marcas.Id  ");
            consultaSQL.Append("WHERE Pedidos.NumeroPedido = @idPedidoParametro ");
            consultaSQL.Append("ORDER BY DetallesPedidos.NumeroItem ASC ");
     



            using (var connection = new SqlConnection(cadenaConexion))
            {
                lista = connection.Query<Entidades.DetallesPedidos>(consultaSQL.ToString(),

                     new
                     {
                         idPedidoParametro = idPedido
                     
                     }).ToList();
            }

            return lista;

        }


        public int CalcularPrecioSegunCantidad(int idPedido, int nroItem, int cantidad)
        {
            int filasAfectadas = 0;
            /*
UPDATE DetallesPedidos
SET Cantidad = 3
WHERE NumeroPedido = 1
AND NumeroItem = 4

            */

            StringBuilder consultaSQL = new StringBuilder();

            consultaSQL.Append("UPDATE DetallesPedidos ");
            consultaSQL.Append("SET Cantidad = @cantidadParametro ");
            consultaSQL.Append("WHERE NumeroPedido = @idPedidoParametro ");
            consultaSQL.Append("AND NumeroItem = @nroItemParametro ");


            using (var connection = new SqlConnection(cadenaConexion))
            {
                filasAfectadas = connection.Execute(consultaSQL.ToString(),
                   new
                   {
                       idPedidoParametro = idPedido,
                       nroItemParametro = nroItem,
                       cantidadParametro = cantidad
                   });


            }

            return filasAfectadas;
        }

        public List<Entidades.Pedidos> MisPedidos(int idCliente) {

            var lista = new List<Entidades.Pedidos>();

            /*
SELECT 
NumeroPedido AS ID_PEDIDO,
Fecha AS FECHA_PEDIDO,
Observacion AS OBSERVACIONES
FROM Pedidos
WHERE CodigoCliente = 1000
ORDER BY Fecha DESC
             */
            StringBuilder consultaSQL = new StringBuilder();
            consultaSQL.Append("SELECT ");
            consultaSQL.Append("NumeroPedido AS ID_PEDIDO, ");
            consultaSQL.Append("Fecha AS FECHA_PEDIDO, ");
            consultaSQL.Append("Observacion AS OBSERVACIONES ");
            consultaSQL.Append("FROM Pedidos ");
            consultaSQL.Append("WHERE CodigoCliente = @idClienteParametro ");
            consultaSQL.Append("ORDER BY Fecha DESC ");




            using (var connection = new SqlConnection(cadenaConexion))
            {
                lista = connection.Query<Entidades.Pedidos>(consultaSQL.ToString(),

                     new
                     {
                         idClienteParametro = idCliente

                     }).ToList();
            }

            return lista;


        }



       



    }
}
