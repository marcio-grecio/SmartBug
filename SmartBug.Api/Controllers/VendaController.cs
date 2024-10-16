﻿using Microsoft.AspNetCore.Authorization;
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
    public class VendaController : BaseController
    {
        private readonly ILogger _Logger;
        public VendaController(ILogger<VendaController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllVendaAsync()
        {
            var empreendimentos = await _Db.Venda
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
        [Route("get-venda")]
        public async Task<IActionResult> GetVendaAsync(long vendaId)
        {
            try
            {
                var user = await _Db.Venda
                    .Where(x => x.Id == vendaId)
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
                    NewValue = user.ToString(),
                    OldValue = "N/A",
                    Descricao = "Consulta de venda",
                    Controller = "Venda",
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
        [Route("create-venda")]
        public async Task<IActionResult> CreateVendaAsync([FromBody] VendaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();
                var empreendimento = await _Db.Empreendimentos.FirstOrDefaultAsync(x => x.Id == model.EmpreendimentoId);

                if (empreendimento.UnidadesDisponiveis <= 0)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Empreendimento sem unidades disponíveis.",
                    });
                }

                if (empreendimento.UnidadesDisponiveis < model.Quantidade)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Empreendimento não possui unidades suficiente.",
                    });
                }

                var venda = new Venda
                {
                    Data = model.Data,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                _Db.Venda.Add(venda);
                await _Db.SaveChangesAsync();

                if (empreendimento is not null)
                {
                    empreendimento.UnidadesDisponiveis = empreendimento.UnidadesDisponiveis - model.Quantidade;
                    _Db.Entry(empreendimento).State = EntityState.Modified;
                    await _Db.SaveChangesAsync();
                }

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = model.ToString(),
                    OldValue = "N/A",
                    Descricao = "Criação de venda",
                    Controller = "Venda",
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Venda criada com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-venda")]
        public async Task<IActionResult> UpdateVendaAsync([FromBody] VendaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();
                var empreendimento = await _Db.Empreendimentos.FirstOrDefaultAsync(x => x.Id == model.EmpreendimentoId);

                if (empreendimento.UnidadesDisponiveis <= 0)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Empreendimento sem unidades disponíveis.",
                    });
                }

                if (empreendimento.UnidadesDisponiveis < model.Quantidade)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Empreendimento não possui unidades suficiente.",
                    });
                }

                var venda = await _Db.Venda
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                if (venda == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Venda não encontrada.",
                    });
                }

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(venda, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                venda.Data = model.Data;
                venda.DataAlteracao = DateTime.Now;
                venda.Quantidade = model.Quantidade;
                venda.EmpreendimentoId = model.EmpreendimentoId;
                venda.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                if (empreendimento is not null)
                {
                    empreendimento.UnidadesDisponiveis = empreendimento.UnidadesDisponiveis - model.Quantidade;
                    _Db.Entry(empreendimento).State = EntityState.Modified;
                    await _Db.SaveChangesAsync();
                }

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(venda, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    NewValue = newValue,
                    OldValue = oldValue,
                    Descricao = "Atualização de venda",
                    Controller = "Venda",
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Venda atualizada com sucesso.",
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
