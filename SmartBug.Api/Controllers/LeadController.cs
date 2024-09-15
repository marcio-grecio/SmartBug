using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SmartBug.Models;
using SmartBug.Models.ViewModel;
using System.Data.Entity;
using System.Net;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LeadController : BaseController
    {

        private readonly ILogger _Logger;
        public LeadController(ILogger<LeadController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllLeadAsync()
        {
            var empreendimentos = await _Db.Leads
                .Where(x=>x.TipoLead == "QUALIFICADO")
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
                .OrderByDescending(o=>o.DataLead)
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-lead")]
        public async Task<IActionResult> GetLeadAsync(long leadId)
        {
            try
            {
                var lead = await _Db.Leads
                    .Where(x => x.Id == leadId && x.TipoLead == "QUALIFICADO")
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
                    Descricao = $"Consulta de empreendimento {leadId}",
                    Controller = "Lead",
                    NewValue = JsonConvert.SerializeObject(lead),
                    OldValue = "N/A"
                });
                    

                return Ok(lead);
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
                var existLead = _Db.Leads.FirstOrDefault(x => x.DataLead == model.DataLead && x.EmpreendimentoId == model.EmpreendimentoId && x.CanalId == model.CanalId && x.TipoLead == "QUALIFICADO");
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
                    CanalId = model.CanalId,
                    TipoLead = "QUALIFICADO",
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
                    Descricao = "Criação de um lead",
                    Controller = "Lead",
                    NewValue = JsonConvert.SerializeObject(lead),
                    OldValue = "N/A"
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
                    .FirstOrDefaultAsync(u => u.Id == model.Id && u.TipoLead == "QUALIFICADO");

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
                        Message = "Lead não encontrado.",
                    });
                }

                lead.CanalId = model.CanalId;
                lead.TipoLead = "QUALIFICADO";
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
                    Descricao = "Atualização de um lead",
                    Controller = "Lead",
                    NewValue = newValue,
                    OldValue = oldValue
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Lead atualizado com sucesso.",
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
