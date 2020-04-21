using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benjamin.PracticoMVC.Entidades
{
    public class DetallesPedidos
    {

        public int NumeroPedido { get; set; }
        public int NumeroItem { get; set; }
        public int CodigoProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }
}
