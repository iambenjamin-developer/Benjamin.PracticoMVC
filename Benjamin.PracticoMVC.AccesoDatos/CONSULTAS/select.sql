SELECT 
NumeroPedido AS ID_PEDIDO,
Fecha AS FECHA_PEDIDO,
Observacion AS OBSERVACIONES
FROM Pedidos
WHERE CodigoCliente = 1000
ORDER BY Fecha DESC
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