using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SmartBug.Models.ViewModel;
using SmartBug.Models;
using System.Data.Entity;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReportController : BaseController
    {
        private readonly ILogger _Logger;
        public ReportController(ILogger<ReportController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-select-all-empreendimento")]
        public async Task<IActionResult> GetSelectAllEmpreendimentoAsync(long userId)
        {
            var empreendimentos = await _Db.Usuarios
                .Where(x => x.Id == userId)
                .SelectMany(x => x.Empreendimentos)
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-leads-by-enterprise")]
        public async Task<IActionResult> GetLeadsByEnterpriseAsync(DateOnly initDate, DateOnly endDate, long empreendimentoId)
        {
            try
            {

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "GET",
                    Descricao = "Relatório de Leads por Empreendimentos",
                    Controller = "Report",
                    NewValue = $"Relatório emitido para o empreendimento {empreendimentoId}, no periodo de {initDate.ToString("dd/MM/yyyy")} à {endDate.ToString("dd/MM/yyyy")}",
                    OldValue = "N/A"
                });

                // Converte DateOnly para DateTime no início do dia e no final do dia
                DateTime initDateTime = initDate.ToDateTime(TimeOnly.MinValue);
                DateTime endDateTime = endDate.ToDateTime(TimeOnly.MaxValue);

                // Busca leads filtrando por empreendimento, data e agrupando por canal
                var result = await _Db.Leads
                    .Include(i => i.Canal)
                    .Where(x => (empreendimentoId == 0 || x.EmpreendimentoId == empreendimentoId) // Ignora o filtro por empreendimentoId se for 0
                                && x.DataLead >= initDateTime
                                && x.DataLead <= endDateTime)
                    .GroupBy(x => x.Canal.Nome.ToUpper())
                    .Select(group => new
                    {
                        Canal = group.Key,
                        Empreendimento = group.Select(g => g.Empreendimento.Nome.ToUpper()).FirstOrDefault(),
                        Construtora = group.Select(g => g.Empreendimento.Construtora.ToUpper()).FirstOrDefault(),
                        Qualificado = group.Where(l => l.TipoLead == "QUALIFICADO").Sum(l => (int?)l.Quantidade) ?? 0,
                        Descartado = group.Where(l => l.TipoLead == "DESCARTADO").Sum(l => (int?)l.Quantidade) ?? 0,
                        Total = group.Sum(l => (int?)l.Quantidade) ?? 0
                    })
                    .OrderByDescending(o => o.Canal)
                    .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Retorna a mensagem de erro detalhada para ajudar na depuração
                return BadRequest(new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

    }
}
