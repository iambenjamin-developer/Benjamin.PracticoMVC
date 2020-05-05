SELECT
Usuarios.Id AS ID_USUARIO,
Usuarios.Usuario AS USERNAME,
Roles.Id AS ID_ROL,
Roles.Descripcion AS ROL_DESCRIPCION,
Clientes.Codigo AS ID_CLIENTE,
Usuarios.Nombre AS NOMBRES,
Usuarios.Apellido AS APELLIDOS
FROM Usuarios
INNER JOIN Roles ON
Usuarios.IdRol = Roles.Id
LEFT JOIN Clientes ON
Usuarios.Id = Clientes.IdUsuario
WHERE Usuarios.Usuario LIKE 'MIMI'
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