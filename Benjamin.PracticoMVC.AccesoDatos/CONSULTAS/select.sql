--CANTIDAD PUESTA EN EL CARRITO SEGUN ID CLIENTE
SELECT COUNT(*) 
FROM DetallesPedidos
WHERE NumeroPedido = (SELECT NumeroPedido 
					  FROM Pedidos
					  WHERE CodigoCliente = 1000)







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