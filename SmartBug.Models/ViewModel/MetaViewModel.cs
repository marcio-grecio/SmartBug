using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class MetaViewModel
    {
        public long Id { get; set; }
        public long Tipo { get; set; }
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
        public int Quantidade { get; set; }
        public long EmpreendimentoId { get; set; }
    }
}
