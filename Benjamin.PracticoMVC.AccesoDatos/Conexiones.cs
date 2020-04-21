using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benjamin.PracticoMVC.AccesoDatos
{
    public class Conexiones
    {
        public static string ObtenerCadenaConexion()
        {
            //cadena de conexion del practico
            return @"Data Source=NOTEBENJA;Initial Catalog=extrados;Integrated Security=True";
        }

    }
}
