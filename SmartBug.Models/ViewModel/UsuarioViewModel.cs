using SmartBug.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class UsuarioViewModel
    {
        public long? Id { get; set; }
        public int Perfil { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Avatar { get; set; }
        public string Ocupacao { get; set; }
        public string IsActive { get; set; }
        public virtual ICollection<long> Empreendimentos { get; set; } = new List<long>();
    }
}
