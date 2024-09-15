using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class AuditoriaViewModel
    {
        public long Id { get; set; }
        public string Tipo { get; set; }
        public string NewValue { get; set; }
        public string OldValue { get; set; }
        public string Descricao { get; set; }
        public string Controller { get; set; }
    }
}
