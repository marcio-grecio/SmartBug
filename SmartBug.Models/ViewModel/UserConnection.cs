using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class UserConnection
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Room { get; set; }
        public string Email { get; set; }
        public IEnumerable<GenericSelectOptions> Empreendimentos { get; set; }

    }
}
