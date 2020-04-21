using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benjamin.PracticoMVC.Entidades
{
    public class Pedidos
    {

        public int NumeroPedido { get; set; }
        public int CodigoCliente { get; set; }
        public DateTime Fecha { get; set; }
        public string Observacion { get; set; }

    }
}
