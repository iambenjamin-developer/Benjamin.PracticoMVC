using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using System.Data.SqlClient;
using Dapper;

namespace Benjamin.PracticoMVC.AccesoDatos
{
   public class Productos
    {
        string cadenaConexion = Conexiones.ObtenerCadenaConexion();

        public List<Entidades.Join_ProductosMarcas> Listar()
        {
            List<Entidades.Join_ProductosMarcas> lista = new List<Entidades.Join_ProductosMarcas>();

            StringBuilder consultaSQL = new StringBuilder();

            /*
             
SELECT  
Productos.Codigo as CODIGO,
Productos.Nombre AS NOMBRE,
Marcas.Nombre AS MARCA,
Productos.PrecioUnitario AS PRECIO,
Productos.Activo AS ACTIVO
FROM Productos
INNER JOIN Marcas ON 
Productos.IdMarca = Marcas.Id


             */

            consultaSQL.Append("SELECT ");
            consultaSQL.Append("Productos.Codigo as CODIGO, ");
            consultaSQL.Append("Productos.Nombre AS NOMBRE, ");
            consultaSQL.Append("Marcas.Nombre AS MARCA, ");
            consultaSQL.Append("Productos.PrecioUnitario AS PRECIO, ");
            consultaSQL.Append("Productos.Activo AS ACTIVO ");
            consultaSQL.Append("FROM Productos ");
            consultaSQL.Append("INNER JOIN Marcas ON  ");
            consultaSQL.Append("Productos.IdMarca = Marcas.Id ");
    

            using (var connection = new SqlConnection(cadenaConexion))
            {
                lista = connection.Query<Entidades.Join_ProductosMarcas>(consultaSQL.ToString()).ToList();
            }

            return lista;
        }
    }
}
