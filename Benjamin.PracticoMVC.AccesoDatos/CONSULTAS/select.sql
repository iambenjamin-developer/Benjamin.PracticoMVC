SELECT 
Usuarios.Id AS ID_USUARIO,
Usuarios.Usuario AS USERNAME,
Usuarios.IdRol AS ID_ROL,
Usuarios.Nombre AS NOMBRES,
Usuarios.Apellido AS APELLIDOS,
Clientes.RazonSocial AS RAZON_SOCIAL, 
Usuarios.Activo AS ACTIVO
FROM Usuarios
LEFT JOIN Clientes ON
Usuarios.Id = Clientes.IdUsuario
WHERE Usuarios.Id = 4
/*

SELECT column1, column2, ...
FROM table_name;

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

DELETE FROM table_name 
WHERE condition;



*/