﻿using System;
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

        public List<Entidades.DetallesPedidos> ListaDetallePedido(int idPedido)
        {

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

        public int EliminarItemPedido(int idPedido, int nroItem)
        {
            int filasAfectadas = 0;
            /*
DELETE FROM DetallesPedidos 
WHERE NumeroPedido = 1
AND NumeroItem = 1;

            */

            StringBuilder consultaSQL = new StringBuilder();

            consultaSQL.Append("DELETE FROM DetallesPedidos ");
            consultaSQL.Append("WHERE NumeroPedido = @numeroPedidoParametro ");
            consultaSQL.Append("AND NumeroItem = @numeroItemParametro ");



            using (var connection = new SqlConnection(cadenaConexion))
            {
                filasAfectadas = connection.Execute(consultaSQL.ToString(),
                   new
                   {
                       numeroPedidoParametro = idPedido,
                       numeroItemParametro = nroItem
                   });


            }

            return filasAfectadas;
        }


        public List<Entidades.Pedidos> MisPedidos(int idCliente)
        {

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


        public int VerCantidadProductosEnCarrito(int idCliente)
        {
            /*
   --CANTIDAD PUESTA EN EL CARRITO SEGUN ID CLIENTE
    
    SELECT COUNT(*) 
    FROM DetallesPedidos
    WHERE NumeroPedido = (SELECT NumeroPedido 
                          FROM Pedidos
                          WHERE CodigoCliente = 1000)
                 */
            int cantidadProductosEnCarrito = 0;

            StringBuilder consultaSQL = new StringBuilder();
            consultaSQL.Append("SELECT COUNT(*) ");
            consultaSQL.Append("FROM DetallesPedidos ");
            consultaSQL.Append(" WHERE NumeroPedido =  ");
            consultaSQL.Append("(SELECT NumeroPedido  ");
            consultaSQL.Append("FROM Pedidos ");
            consultaSQL.Append("WHERE CodigoCliente = @idClienteParametro) ");


            using (var connection = new SqlConnection(cadenaConexion))
            {
                cantidadProductosEnCarrito = connection.ExecuteScalar<int>(consultaSQL.ToString(),
                   new
                   {
                       idClienteParametro = idCliente
                   });

            }

            return cantidadProductosEnCarrito;
        }

        public int AgregarAlCarrito(int idCliente, int idProducto)
        {
            /*
             SELECT COUNT (*) FROM Pedidos
             WHERE CodigoCliente  = 1000
             */
            int cantidadPedidos = 0;

            StringBuilder consultaSQL = new StringBuilder();
            consultaSQL.Append("SELECT COUNT (*) FROM Pedidos ");
            consultaSQL.Append("WHERE CodigoCliente  = @idClienteParametro ");

            using (var connection = new SqlConnection(cadenaConexion))
            {
                cantidadPedidos = connection.ExecuteScalar<int>(consultaSQL.ToString(),
                   new
                   {
                       idClienteParametro = idCliente
                   });


            }

            int cantidadItemsCarrito;

            if (cantidadPedidos == 0)
            {
                cantidadItemsCarrito = CrearPedido(idCliente, idProducto);
            }
            else
            {
                cantidadItemsCarrito = EditarPedido(idCliente, idProducto);
            }


            return cantidadItemsCarrito;
        }



        public int CrearPedido(int idCliente, int idProducto)
        {

            /*
             
-- SI NO TIENE NINGUN PEDIDO ASIGNADO, CREAR UNO Y EL DETALLE DE ESE PEDIDO
INSERT INTO Pedidos(CodigoCliente, Fecha, Observacion)
VALUES (@idClienteParametro , GETDATE(), '')

--CREAR DETALLE DE PEDIDO DE ESE PEDIDO

INSERT INTO DetallesPedidos(NumeroPedido, 
							NumeroItem, 
							CodigoProducto, 
							Cantidad, 
							PrecioUnitario)
VALUES 						((SELECT MAX(NumeroPedido) FROM Pedidos),
							1, 
							@idProductoParametro, 
							1, 
							(SELECT PrecioUnitario FROM PRODUCTOS WHERE Codigo = @idProductoParametro));

             
             */

            int filasAfectadas = 0;
            int cantidadProductosEnCarrito = 0;
            SqlConnection conexion = new SqlConnection(cadenaConexion);


            conexion.Open();

            //como vamos a realizar dos inserciones debemos hacerlo con una transaccion
            var transaccion = conexion.BeginTransaction();


            try
            {
                /*
                 INSERT INTO Pedidos(CodigoCliente, Fecha, Observacion)
                VALUES (@idClienteParametro , GETDATE(), '')
                                 */

                StringBuilder consultaSQL1 = new StringBuilder();
                consultaSQL1.Append("INSERT INTO Pedidos(CodigoCliente, Fecha, Observacion) ");
                consultaSQL1.Append("VALUES (@idClienteParametro , @fechaParametro, @observacionParametro) ");



                filasAfectadas = conexion.Execute(consultaSQL1.ToString(),
                       new
                       {
                           idClienteParametro = idCliente,
                           fechaParametro = DateTime.Now,
                           observacionParametro = string.Empty

                       }
                       , transaction: transaccion);



                /*
                 INSERT INTO DetallesPedidos(NumeroPedido, 
							NumeroItem, 
							CodigoProducto, 
							Cantidad, 
							PrecioUnitario)
VALUES 						((SELECT MAX(NumeroPedido) FROM Pedidos),
							1, 
							@idProductoParametro, 
							1, 
							(SELECT PrecioUnitario FROM PRODUCTOS WHERE Codigo = @idProductoParametro));
                 */
                StringBuilder consultaSQL2 = new StringBuilder();
                consultaSQL2.Append("INSERT INTO DetallesPedidos(NumeroPedido, NumeroItem, CodigoProducto, Cantidad, PrecioUnitario) ");
                consultaSQL2.Append("VALUES( ");
                consultaSQL2.Append("(SELECT MAX(NumeroPedido) FROM Pedidos), ");
                consultaSQL2.Append("1, ");
                consultaSQL2.Append("@idProductoParametro,  ");
                consultaSQL2.Append("1, ");
                consultaSQL2.Append("(SELECT PrecioUnitario FROM PRODUCTOS WHERE Codigo = @idProductoParametro)); ");


                filasAfectadas = conexion.Execute(consultaSQL2.ToString(),
                       new
                       {
                           idProductoParametro = idProducto
                       },
                       transaction: transaccion);

                // si las operaciones relacionadas salieron bien, se realiza un commit
                transaccion.Commit();

                cantidadProductosEnCarrito = VerCantidadProductosEnCarrito(idCliente);

            }
            catch (Exception ex)
            {
                // en caso que haya un error en el medio de la funcion
                //lanzamos codigo de error 0 y realizamos un rollback para que los datos
                //no se reflejen en la base de datos
                filasAfectadas = 0;
                transaccion.Rollback();

            }
            finally
            {
                //si el procedimiento salio bien o mal, siempre se debe cerrar la conexion
                conexion.Close();
            }

            // si el resultado de filasafectadas es 1 es porque salio OK
            return cantidadProductosEnCarrito;
      
        }

        public int EditarPedido(int idCliente, int idProducto)
        {
            return -2;
        }





    }
}
