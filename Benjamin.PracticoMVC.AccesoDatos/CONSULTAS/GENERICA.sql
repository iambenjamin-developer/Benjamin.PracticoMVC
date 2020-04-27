           

                   select
                   * from Usuarios
                  
                   WHERE Id = 33

/*             
SELECT  
Usuarios.Nombre + ' '+ Usuarios.Apellido AS NOMBRE,
Roles.Descripcion AS ROL, 
Usuarios.Id AS ID, 
Usuarios.Usuario AS USUARIO
FROM Usuarios
INNER JOIN Roles ON 
Usuarios.IdRol = Roles.Id

           
SELECT COUNT(*) FROM Usuarios
WHERE Usuario LIKE 'bcorrea'
AND (Password IS NULL OR Password LIKE '')
*/