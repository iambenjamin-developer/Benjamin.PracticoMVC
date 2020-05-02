SELECT 
Productos.Codigo AS CODIGO,
Productos.UrlImange AS UBICACION,
Productos.Nombre AS NOMBRE,
Marcas.Nombre AS MARCA,
Productos.Descripcion AS  DESCRIPCION,
Productos.PrecioUnitario AS PRECIO_UNITARIO
FROM Productos
INNER JOIN Marcas ON
Productos.IdMarca = Marcas.Id
WHERE Productos.Activo = 1

/*       
update productos
set UrlImange = '/images/productos/notebook.png'
where Codigo = 1001

update productos
set UrlImange = 'https://images-na.ssl-images-amazon.com/images/I/614NXyzuFxL._SX385_.jpg'
where Codigo = 1002

select * from Productos
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