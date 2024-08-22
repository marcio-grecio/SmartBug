using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class EmpreendimentoViewModel
    {
        public long Id { get; set; }
        public DateTime? DataCadastro { get; set; }
        public long? UsuarioAlteracao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public string Nome { get; set; }
        public string Localidade { get; set; }
        public string Construtora { get; set; }
        public int UnidadesTotal { get; set; }
        public int UnidadesDisponiveis { get; set; }
        public virtual ICollection<long> Usuarios { get; set; } = new List<long>();
    }
}
