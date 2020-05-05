

--SELECT 
--Marcas.Nombre AS MARCA,
--Productos.Nombre AS PRODUCTO,
--DetallesPedidos.PrecioUnitario AS PRECIO_UNITARIO,
--DetallesPedidos.Cantidad AS CANTIDAD,
--(DetallesPedidos.PrecioUnitario * DetallesPedidos.Cantidad) AS SUBTOTAL
--FROM DetallesPedidos
--INNER JOIN Pedidos ON
--DetallesPedidos.NumeroPedido = Pedidos.NumeroPedido
--INNER JOIN Productos ON
--DetallesPedidos.CodigoProducto = Productos.Codigo
--INNER JOIN Marcas ON
--Productos.IdMarca = Marcas.Id 
--WHERE Pedidos.NumeroPedido = 1
--ORDER BY Pedidos.Fecha DESC, DetallesPedidos.NumeroItem ASC

SELECT * FROM DetallesPedidos
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