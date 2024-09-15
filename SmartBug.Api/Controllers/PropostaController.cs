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
    public class PropostaController : BaseController
    {
        private readonly ILogger _Logger;
        public PropostaController(ILogger<PropostaController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllPropostaAsync()
        {
            var empreendimentos = await _Db.Proposta
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
        [Route("get-proposta")]
        public async Task<IActionResult> GetPropostaAsync(long propostaId)
        {
            try
            {
                var proposta = await _Db.Proposta
                    .Where(x => x.Id == propostaId)
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
                    NewValue = JsonConvert.SerializeObject(proposta),
                    Controller = "Proposta",
                    Descricao = "Consulta de lead",
                    OldValue = "N/A",

                });

                return Ok(proposta);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create-proposta")]
        public async Task<IActionResult> CreatePropostaAsync([FromBody] PropostaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var proposta = new Proposta
                {
                    Data = model.Data,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                _Db.Proposta.Add(proposta);
                await _Db.SaveChangesAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = JsonConvert.SerializeObject(proposta),
                    Controller = "Proposta",
                    Descricao = "Criação de proposta",
                    OldValue = "N/A",
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Cliente com proposta criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-proposta")]
        public async Task<IActionResult> UpdatePropostaAsync([FromBody] PropostaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();


                var proposta = await _Db.Proposta
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(proposta, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                if (proposta == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Cliente com proposta não encontrado.",
                    });
                }

                proposta.Data = model.Data;
                proposta.DataAlteracao = DateTime.Now;
                proposta.Quantidade = model.Quantidade;
                proposta.EmpreendimentoId = model.EmpreendimentoId;
                proposta.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(proposta, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = newValue,
                    Controller = "Proposta",
                    Descricao = "Atualização de proposta",
                    OldValue = oldValue,
                });


                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Cliente com proposta atualizado com sucesso.",
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
