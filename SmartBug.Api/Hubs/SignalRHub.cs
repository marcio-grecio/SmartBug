using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SmartBug.Models.ViewModel;
using System.Collections.Concurrent;

namespace SmartBug.Api.Hubs
{
    //[Authorize]
    public class SignalRHub : Hub
    {
        private readonly ILogger<SignalRHub> _logger;

        // Inicialize o dicionário como um ConcurrentDictionary para melhor segurança em operações simultâneas
        public static IDictionary<string, UserConnection> SignalRConnections { get; set; } = new ConcurrentDictionary<string, UserConnection>();

        public SignalRHub(ILogger<SignalRHub> logger)
        {
            _logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            try
            {
                if (Context.User.Identity.IsAuthenticated)
                {
                    var id = Context.User.FindFirst("id")?.Value;
                    var nome = Context.User.FindFirst("nome")?.Value;
                    var email = Context.User.FindFirst("userName")?.Value;
                    var empreendimentos = JsonConvert.DeserializeObject<List<GenericSelectOptions>>(Context.User.FindFirst("empreendimentos")?.Value);

                    var userConnection = new UserConnection
                    {
                        Id = id,
                        Nome = nome,
                        Email = email,
                        Room = $"{id}-{email}",
                        Empreendimentos = empreendimentos,
                    };

                    SignalRConnections.Add(Context.ConnectionId, userConnection);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[ChatHub][OnConnectedAsync][Error] Start.ChatConnections: {@Connections}", SignalRConnections.Values.ToList());
            }

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            SignalRConnections.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
