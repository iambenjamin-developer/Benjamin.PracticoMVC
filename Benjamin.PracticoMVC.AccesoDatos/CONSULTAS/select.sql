SELECT 
NumeroPedido AS ID_PEDIDO,
CodigoCliente AS ID_CLIENTE,
Fecha AS FECHA_PEDIDO, 
SUBSTRING( Observacion, 4, 90 ) AS OBSERVACIONES,
SUBSTRING( Observacion, 0, 4 ) AS ESTADO_PEDIDO --PSEUDO COLUMNA CONTENIDA DENTRO DE LA COLUMNA OBSERVACION
FROM Pedidos
WHERE SUBSTRING( Observacion, 0, 4 ) = '(P)'
--AND CodigoCliente = 1000
ORDER BY FECHA_PEDIDO DESC

--INSERT INTO DetallesPedidos (NumeroPedido, NumeroItem, CodigoProducto, Cantidad, PrecioUnitario )
--VALUES (1, 10, 1007, 5, 152.67);

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