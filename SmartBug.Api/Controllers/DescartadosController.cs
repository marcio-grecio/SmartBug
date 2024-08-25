using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Models.ViewModel;
using SmartBug.Models;
using System.Data.Entity;
using System.Net;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DescartadosController : BaseController
    {

        private readonly ILogger<DescartadosController> _Logger;

        public DescartadosController(ILogger<DescartadosController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllLeadAsync()
        {
            var empreendimentos = await _Db.Descartados
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
                var user = await _Db.Descartados
                    .Where(x => x.Id == leadId)
                    .Select(x => new
                    {
                        x.Id,
                        x.CanalId,
                        x.DataLead,
                        x.Quantidade,
                        x.EmpreendimentoId,
                    }).AsNoTracking().FirstOrDefaultAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create-lead")]
        public async Task<IActionResult> CreateLeadAsync([FromBody] LeadViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var lead = new Descartado
                {
                    CanalId = model.CanalId,
                    DataLead = model.DataLead,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                _Db.Descartados.Add(lead);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Lead criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
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


                var lead = await _Db.Descartados
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                if (lead == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Lead não encontrado.",
                    });
                }

                lead.CanalId = model.CanalId;
                lead.DataLead = model.DataLead;
                lead.DataAlteracao = DateTime.Now;
                lead.Quantidade = model.Quantidade;
                lead.EmpreendimentoId = model.EmpreendimentoId;
                lead.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Lead atualizado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
