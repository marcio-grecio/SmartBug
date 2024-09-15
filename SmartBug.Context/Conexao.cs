using SmartBug.Models;
using System.Data.Entity;
using MySql.Data.EntityFramework;

namespace SmartBug.Context
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class Conexao : DbContext
    {
        public DbSet<Meta> Metas { get; set; }
        public DbSet<Lead> Leads { get; set; }
        public DbSet<Venda> Venda { get; set; }
        public DbSet<Canal> Canais { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Proposta> Proposta { get; set; }
        public DbSet<Auditoria> Auditoria { get; set; }
        public DbSet<Empreendimento> Empreendimentos { get; set; }
        public Conexao() : base("server=191.96.156.37;database=smartbug;user=admin;password=51910648;default command timeout=20;persistsecurityinfo=True;SslMode=none")
        {
            //this.Database.Log = Console.WriteLine;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empreendimento>()
                .HasMany(e => e.Usuarios)
                .WithMany(u => u.Empreendimentos)
                .Map(m =>
                {
                    m.ToTable("empreendimentousuario");
                    m.MapLeftKey("EMPREENDIMENTOID");
                    m.MapRightKey("USUARIOID");
                });
        }
    }
}