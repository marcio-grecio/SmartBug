using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models
{
    [Table("CANAL")]
    public class Canal
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
    }
}
