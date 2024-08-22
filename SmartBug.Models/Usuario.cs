using SmartBug.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartBug.Models
{
    [Table("USUARIO")]
    public class Usuario
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

        [Column("OCUPACAO")]
        public string Ocupacao { get; set; }

        [Column("AVATAR")]
        public string Avatar { get; set; } = "Default";

        [Column("EMAIL")]
        public string Email { get; set; }

        [Column("PERFIL")]
        public int Perfil { get; set; } = 3;

        [Column("SENHA")]
        public string Senha { get; set; } 

        [Column("ISACTIVE")]
        public SituacaoEnum IsActive { get; set; } = SituacaoEnum.Active;

        public virtual ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();
    }


    public static class MD5Hash
    {
        public static string CalculaHash()
        {
            var tamanho = 8;
            var chars = "0123456789ASDEFGHIJKLMNOPQRSTUVWXYZ";
            var random = new Random();
            var senha = new string(Enumerable.Repeat(chars, tamanho).Select(s => s[random.Next(s.Length)]).ToArray());

            try
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(senha);
                byte[] hash = System.Security.Cryptography.MD5.HashData(inputBytes);
                System.Text.StringBuilder sb = new();
                for (int i = 0; i < hash.Length; i++)
                {
                    sb.Append(hash[i].ToString("X2"));
                }
                return sb.ToString();
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}