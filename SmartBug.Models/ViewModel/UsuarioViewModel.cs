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
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public int Perfil { get; set; }
        public SituacaoEnum IsActive { get; set; }
        public virtual ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();


    }
}
