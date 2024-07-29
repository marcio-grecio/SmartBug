using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartBug.Models
{
    [Table("EMPREENDIMENTOUSUARIO")]
    public class EmpreendimentoUsuario
    {
        [Key, Column(Order = 0)]
        public long EmpreendimentoId { get; set; }

        [Key, Column(Order = 1)]
        public long UsuarioId { get; set; }

        public Empreendimento Empreendimento { get; set; }
        public Usuario Usuario { get; set; }
    }
}
