using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartBug.Models
{
    [Table("EMPREENDIMENTO")]
    public class Empreendimento
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

        [Column("NOME")]
        public string Nome { get; set; }

        [Column("LOCALIDADE")]
        public string Localidade { get; set; }

        [Column("CONSTRUTORA")]
        public string Construtora { get; set; }

        [Column("UNIDADES_TOTAL")]
        public int UnidadesTotal { get; set; } = 0;

        [Column("UNIDADES_DISPONIVEIS")]
        public int UnidadesDisponiveis { get; set; } = 0;

        [Column("COR")]
        public string Cor { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
    }
}
