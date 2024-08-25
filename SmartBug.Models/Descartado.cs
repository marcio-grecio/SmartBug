using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartBug.Models
{
    [Table("DESCARTADOS")]
    public class Descartado
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Column("DATA_CADASTRO")]
        public DateTime? DataCadastro { get; set; } = DateTime.Now;

        [Column("USUARIO_ALTERACAO")]
        public long? UsuarioAlteracao { get; set; }

        [Column("DATA_ALTERACAO")]
        public DateTime? DataAlteracao { get; set; } = DateTime.Now;

        [Column("DATA_LEAD")]
        public DateTime DataLead { get; set; }

        [Column("CANALID")]
        public long CanalId { get; set; }

        [Column("QUANTIDADE")]
        public int Quantidade { get; set; }

        [Column("EMPREENDIMENTOID")]
        public long EmpreendimentoId { get; set; }
        public virtual Canal Canal { get; set; }
        public virtual Empreendimento Empreendimento { get; set; }

    }
}
