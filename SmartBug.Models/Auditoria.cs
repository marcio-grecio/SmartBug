using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models
{
    [Table("AUDITORIA")]
    public class Auditoria
    {
        [Key]
        [Column("ID")]
        public long Id { get; set; }

        [Column("USUARIO_ID")]
        public long UsuarioId { get; set; }

        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; } = DateTime.Now;

        [Column("DATA_ALTERACAO")]
        public DateTime DataAlteracao { get; set; } = DateTime.Now;

        [Column("TIPO")]
        public string Tipo { get; set; }

        [Column("DESCRICAO")]
        public string Descricao { get; set; }

        [Column("CONTROLLER")]
        public string Controller { get; set; }

        [Column("NEWVALUE")]
        public string NewValue { get; set; }

        [Column("OLDVALUE")]
        public string OldValue { get; set; }

        public virtual Usuario Usuario { get; set; }

    }
}
