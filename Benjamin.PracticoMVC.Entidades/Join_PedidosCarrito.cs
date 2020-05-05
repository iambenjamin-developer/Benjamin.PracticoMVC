using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benjamin.PracticoMVC.Entidades
{
    public class Join_PedidosCarrito
    {

        public int ID_PEDIDO { get; set; }

        public int ID_CLIENTE { get; set; }

        public DateTime FECHA_PEDIDO { get; set; }

        public string OBSERVACIONES { get; set; }

        public int NRO_ITEM { get; set; }

        public int ID_PRODUCTO { get; set; }

        public string MARCA { get; set; }

        public string PRODUCTO_DESCRIPCION { get; set; }

        public decimal PRECIO_UNITARIO { get; set; }

        public int CANTIDAD { get; set; }

        public decimal SUBTOTAL { get; set; }

        public decimal TOTAL { get; set; }
    }
}
