using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Models.ViewModel;
using SmartBug.Models;
using System.Data.Entity;
using System.Net;
using Newtonsoft.Json;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClienteController : BaseController
    {
        private readonly ILogger _Logger;
        public ClienteController(ILogger<ClienteController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllClienteAsync()
        {
            var empreendimentos = await _Db.Cliente
                .Include(i => i.Empreendimento)
                .Select(f => new
                {
                    f.Id,
                    f.Data,
                    f.Quantidade,
                    Empreendimento = f.Empreendimento.Nome.ToUpper(),
                    Construtora = f.Empreendimento.Construtora.ToUpper(),
                })
                .OrderByDescending(o => o.Data)
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-cliente")]
        public async Task<IActionResult> GetClienteAsync(long clienteId)
        {
            try
            {
                var user = await _Db.Cliente
                    .Where(x => x.Id == clienteId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Data,
                        x.Quantidade,
                        x.EmpreendimentoId,
                    }).AsNoTracking().FirstOrDefaultAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "GET",
                    NewValue = JsonConvert.SerializeObject(user),
                    OldValue = "N/A",
                    Descricao = "Consulta de Cliente P4",
                    Controller = "Cliente",
                });

                return Ok(user);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create-cliente")]
        public async Task<IActionResult> CreateClienteAsync([FromBody] ClienteViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var cliente = new Cliente
                {
                    Data = model.Data,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = JsonConvert.SerializeObject(cliente),
                    OldValue = null,
                    Descricao = "Criação de Cliente P4",
                    Controller = "Cliente",
                });

                _Db.Cliente.Add(cliente);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Cliente P4 criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-cliente")]
        public async Task<IActionResult> UpdateClienteAsync([FromBody] ClienteViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();


                var cliente = await _Db.Cliente
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                if (cliente == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Cliente P4 não encontrado.",
                    });
                }

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(cliente, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                cliente.Data = model.Data;
                cliente.DataAlteracao = DateTime.Now;
                cliente.Quantidade = model.Quantidade;
                cliente.EmpreendimentoId = model.EmpreendimentoId;
                cliente.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(cliente, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = newValue,
                    OldValue = oldValue,
                    Descricao = "Atualização de Cliente P4",
                    Controller = "Cliente",
                });


                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Cliente P4 atualizado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
