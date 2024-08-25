namespace SmartBug.Models.ViewModel
{
    public class VendaViewModel
    {
        public long Id { get; set; }
        public DateTime Data { get; set; }
        public int Quantidade { get; set; }
        public long EmpreendimentoId { get; set; }
    }
}
