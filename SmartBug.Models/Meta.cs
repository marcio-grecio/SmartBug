using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models
{
    [Table("META")]
    public class Meta
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

        [Column("DATA_INICIAL")]
        public DateTime DataInicial { get; set; }

        [Column("DATA_FINAL")]
        public DateTime DataFinal { get; set; }

        [Column("QUANTIDADE")]
        public int Quantidade { get; set; }

        [Column("EMPREENDIMENTOID")]
        public long EmpreendimentoId { get; set; }
        public long Tipo { get; set; }
        public virtual Empreendimento Empreendimento { get; set; }

    }
}
