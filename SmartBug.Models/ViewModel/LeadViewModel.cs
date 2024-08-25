using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class LeadViewModel
    {
        public long Id { get; set; }
        public DateTime DataLead { get; set; }
        public long CanalId { get; set; }
        public int Quantidade { get; set; }
        public long EmpreendimentoId { get; set; }
    }
}
