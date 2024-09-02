using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using Newtonsoft.Json;
using System.Data.Entity;

namespace SmartBug.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DashboardController : BaseController
    {
        private readonly ILogger<DashboardController> _Logger;

        public DashboardController(ILogger<DashboardController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-leads")]
        public async Task<IActionResult> GetAllLeadsAsync()
        {
            try
            {
                var dateNow = DateTime.Now.AddDays(-1);
                var dateSevenDaysAgo = dateNow.AddDays(-7);

                // Ordena o intervalo de datas do menor para o maior
                var dateRange = Enumerable.Range(0, 7)
                    .Select(i => dateNow.AddDays(-i).Date)
                    .OrderBy(date => date)
                    .ToList();

                var leads = await _Db.Leads
                    .Include(i => i.Empreendimento)
                    .Where(x => x.DataLead >= dateSevenDaysAgo)
                    .ToListAsync();

                var groupedData = leads
                    .GroupBy(x => new { x.Empreendimento.Nome, x.DataLead.Date, x.Empreendimento.Cor })
                    .ToList();

                var empreendimentos = groupedData
                    .GroupBy(g => g.Key.Nome)
                    .Select(g => new
                    {
                        g.First().Key.Cor,
                        Empreendimento = g.Key,
                        Quantidades = dateRange.Select(date => new
                        {
                            Date = date.ToString("dd/MM/yyyy"),
                            Count = g.Where(x => x.Key.Date == date).Sum(x => x.Sum(lead => lead.Quantidade))
                        })
                        .ToDictionary(d => d.Date, d => d.Count)
                    })
                    .ToList();

                var header = dateRange.Select(d => d.ToString("dd/MM/yyyy")).ToList();
                var tableFormat = empreendimentos
                    .Select(x => new
                    {
                        x.Cor,
                        Nome = x.Empreendimento,
                        Quantidades = header.Select(h => x.Quantidades.ContainsKey(h) ? x.Quantidades[h].ToString() : "0").ToList()
                    })
                    .ToList();

                var result = new
                {
                    Datas = header,
                    Empreendimentos = tableFormat
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("get-canais")]
        public async Task<IActionResult> GetAllCanaisAsync()
        {
            try
            {
                var dateSevenDaysAgo = DateTime.Now.AddDays(-7);

                var canaisComQuantidade = await _Db.Leads
                    .Include(i => i.Canal)
                    .Where(x => x.DataLead >= dateSevenDaysAgo)
                    .GroupBy(x => x.Canal.Nome)
                    .Select(g => new
                    {
                        Name = g.Key,
                        Value = g.Sum(x => x.Quantidade)
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();

                return Ok(canaisComQuantidade);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("get-leads-mensal")]
        public async Task<IActionResult> GetAllLeadsMensalAsync()
        {
            try
            {
                var currentMonth = DateTime.Now.Month;
                var currentYear = DateTime.Now.Year;

                // Recupera os leads do banco de dados filtrando pelo mês e ano atuais
                var canaisComQuantidade = await _Db.Leads
                    .Include(i => i.Empreendimento)
                    .Where(x => x.DataLead.Month == currentMonth && x.DataLead.Year == currentYear)
                    .ToListAsync();

                // Agrupa os dados por nome do empreendimento e calcula a quantidade de leads por dia
                var groupedData = canaisComQuantidade
                    .GroupBy(x => x.Empreendimento.Nome)
                    .Select(g => new
                    {
                        name = g.Key,
                        // Calcula a soma de leads por dia e remove os dias com soma maior que zero
                        values = Enumerable.Range(1, DateTime.DaysInMonth(currentYear, currentMonth))
                                           .Select(day => new
                                           {
                                               Day = day,
                                               Quantity = g.Where(x => x.DataLead.Day == day).Sum(x => x.Quantidade) // Soma os leads para cada dia
                                           })
                                           .Where(d => d.Quantity > 0) // Filtra apenas dias com soma maior que zero
                                           .ToList()
                    })
                    // Remove grupos sem dados
                    .Where(g => g.values.Any())
                    .ToList();

                // Cria o eixo X apenas com os dias que têm valores
                var xAxisData = groupedData
                    .SelectMany(g => g.values.Select(v => v.Day))
                    .Distinct()
                    .OrderBy(day => day)
                    .Select(day => new DateTime(currentYear, currentMonth, day).ToString("dd-MM"))
                    .ToList();

                return Ok(new { data = groupedData, xAxisData });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("get-vendas")]
        public async Task<IActionResult> GetAllVendasAsync()
        {
            try
            {
                var metas = await _Db.Metas.Include(m => m.Empreendimento).ToListAsync();
                var vendas = await _Db.Venda.ToListAsync();

                var result = metas.Select(meta =>
                {
                    var venda = vendas.Where(v => v.EmpreendimentoId == meta.EmpreendimentoId).Sum(v => v.Quantidade);

                    return new
                    {
                        name = meta.Empreendimento.Nome,
                        total = meta.Quantidade,
                        executed = venda,
                        color = meta.Empreendimento.Cor
                    };
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
