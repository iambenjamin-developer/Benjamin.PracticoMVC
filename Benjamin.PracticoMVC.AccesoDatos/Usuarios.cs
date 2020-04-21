using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using System.Data.SqlClient;
using Dapper;
using System.Security.Cryptography;


namespace Benjamin.PracticoMVC.AccesoDatos
{
    public class Usuarios
    {
        string cadenaConexion = Conexiones.ObtenerCadenaConexion();

        public List<Entidades.Join_UsuariosRoles> Listar()
        {
            List<Entidades.Join_UsuariosRoles> listaUsuariosRoles = new List<Entidades.Join_UsuariosRoles>();

            StringBuilder consultaSQL = new StringBuilder();

            /*
             
SELECT  
Usuarios.Id AS ID, 
Usuario AS USUARIO, 
Roles.Descripcion AS ROL, 
Nombre AS NOMBRES, 
Apellido AS APELLIDOS, 
Activo AS ESTADO
FROM Usuarios
INNER JOIN Roles ON 
Usuarios.IdRol = Roles.Id


             */

            consultaSQL.Append("SELECT ");
            consultaSQL.Append("Usuarios.Id AS ID, ");
            consultaSQL.Append("Usuario AS USUARIO, ");
            consultaSQL.Append("Roles.Descripcion AS ROL, ");
            consultaSQL.Append("Nombre AS NOMBRES, ");
            consultaSQL.Append("Apellido AS APELLIDOS, ");
            consultaSQL.Append("Activo AS ESTADO ");
            consultaSQL.Append("FROM Usuarios ");
            consultaSQL.Append("INNER JOIN Roles ON  ");
            consultaSQL.Append("Usuarios.IdRol = Roles.Id ");


            using (var connection = new SqlConnection(cadenaConexion))
            {
                listaUsuariosRoles = connection.Query<Entidades.Join_UsuariosRoles>(consultaSQL.ToString()).ToList();
            }

            return listaUsuariosRoles;
        }





        public bool ConfirmarEliminacion(object id)
        {
            throw new NotImplementedException();
        }

        public void Crear(Entidades.Usuarios objEntidad)
        {
            throw new NotImplementedException();
        }

        public void Desechar()
        {
            throw new NotImplementedException();
        }

        public void Deshabilitar(object id)
        {
            throw new NotImplementedException();
        }

        public Entidades.Usuarios Detalles(object id)
        {
            throw new NotImplementedException();
        }

        public void Editar(Entidades.Usuarios objEntidad)
        {
            throw new NotImplementedException();
        }

        public void Eliminar(object id)
        {
            throw new NotImplementedException();
        }

        public void Guardar()
        {
            throw new NotImplementedException();
        }


    }
}
