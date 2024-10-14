namespace SmartBug.Models.ViewModel
{
    public class UserAuthViewModel
    {
        public UserAuthViewModel(long? id, string nome, string email, string avatar, int perfil, IEnumerable<GenericSelectOptions> empreendimentos)
        {
            Id = id;
            Nome = nome;
            Login = email;
            Avatar = avatar;
            Perfil = perfil;
            Empreendimentos = empreendimentos.OrderBy(o => o.Value);
        }

        public long? Id { get; set; }
        public int Perfil { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Avatar { get; set; }
        public IEnumerable<GenericSelectOptions> Empreendimentos { get; protected set; }

    }
}