using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class ClienteViewModel
    {
        public long Id { get; set; }
        public DateTime Data { get; set; }
        public int Quantidade { get; set; }
        public long EmpreendimentoId { get; set; }
    }
}
