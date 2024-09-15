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
    public class DescartadosController : BaseController
    {
        private readonly ILogger _Logger;
        public DescartadosController(ILogger<DescartadosController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllLeadAsync()
        {
            var empreendimentos = await _Db.Leads
                .Where(x => x.TipoLead == "DESCARTADO")
                .Include(i => i.Empreendimento)
                .Select(f => new
                {
                    f.Id,
                    f.DataLead,
                    f.Quantidade,
                    Canal = f.Canal.Nome.ToUpper(),
                    Empreendimento = f.Empreendimento.Nome.ToUpper(),
                    Construtora = f.Empreendimento.Construtora.ToUpper(),
                })
                .OrderByDescending(o => o.DataLead)
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-lead")]
        public async Task<IActionResult> GetLeadAsync(long leadId)
        {
            try
            {
                var user = await _Db.Leads
                    .Where(x => x.Id == leadId && x.TipoLead == "DESCARTADO")
                    .Select(x => new
                    {
                        x.Id,
                        x.CanalId,
                        x.DataLead,
                        x.Quantidade,
                        x.EmpreendimentoId,
                    }).AsNoTracking().FirstOrDefaultAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "GET",
                    NewValue = JsonConvert.SerializeObject(user),
                    OldValue = "N/A",
                    Descricao = "Consulta de lead",
                    Controller = "Descartados"
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
        [Route("create-lead")]
        public async Task<IActionResult> CreateLeadAsync([FromBody] LeadViewModel model)
        {
            try
            {
                model.DataLead = new DateTime(model.DataLead.Year, model.DataLead.Month, model.DataLead.Day, 0, 0, 0);
                var existLead = _Db.Leads.FirstOrDefault(x => x.DataLead == model.DataLead && x.EmpreendimentoId == model.EmpreendimentoId && x.CanalId == model.CanalId && x.TipoLead == "DESCARTADO");
                if (existLead is not null)
                {
                    return Conflict(new
                    {
                        StatusCode = HttpStatusCode.Conflict,
                        Message = "Lead já cadastrado.",
                    });
                }

                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var lead = new Lead
                {
                    TipoLead = "DESCARTADO",
                    CanalId = model.CanalId,
                    DataLead = model.DataLead,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                _Db.Leads.Add(lead);
                await _Db.SaveChangesAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = JsonConvert.SerializeObject(lead),
                    OldValue = null,
                    Descricao = "Criação de lead Descartado",
                    Controller = "Descartados"
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Lead criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-lead")]
        public async Task<IActionResult> UpdateLeadAsync([FromBody] LeadViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();


                var lead = await _Db.Leads
                    .FirstOrDefaultAsync(u => u.Id == model.Id && u.TipoLead == "DESCARTADO");

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(lead, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                if (lead == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Lead descartado não encontrado.",
                    });
                }

                lead.TipoLead = "DESCARTADO";
                lead.CanalId = model.CanalId;
                lead.DataLead = model.DataLead;
                lead.DataAlteracao = DateTime.Now;
                lead.Quantidade = model.Quantidade;
                lead.EmpreendimentoId = model.EmpreendimentoId;
                lead.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(lead, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = newValue,
                    OldValue = oldValue,
                    Descricao = "Atualização de lead descartado",
                    Controller = "Descartados"
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Lead descartado atualizado com sucesso.",
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
