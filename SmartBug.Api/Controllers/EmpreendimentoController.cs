using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SmartBug.Models;
using SmartBug.Models.Enums;
using SmartBug.Models.ViewModel;
using System.Data.Entity;
using System.Net;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmpreendimentoController : BaseController
    {
        private readonly ILogger _Logger;
        public EmpreendimentoController(ILogger<EmpreendimentoController> logger)
        {
            _Logger = logger;
        }


        [HttpGet]
        [Route("get-select-all")]
        public async Task<IActionResult> GetSelectAllEmpreendimentoAsync()
        {
            var empreendimentos = await _Db.Empreendimentos
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

             return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllEmpreendimentoAsync()
        {
            var empreendimentos = await _Db.Empreendimentos
                .Include(i=>i.Usuarios)
                .Select(f => new { 
                    f.Id, 
                    f.Cor,
                    f.UnidadesTotal,
                    f.UnidadesDisponiveis,
                    Nome = f.Nome.ToUpper(),
                    Localidade = f.Localidade.ToUpper(),
                    Construtora = f.Construtora.ToUpper(),
                })
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-empreendimento")]
        public async Task<IActionResult> GetEmpreendimentoAsync(long empreendimentoId)
        {
            try
            {
                var user = await _Db.Empreendimentos
                    .Include(x => x.Usuarios)
                    .Where(x => x.Id == empreendimentoId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Cor,
                        x.Nome,
                        x.Localidade,
                        x.Construtora,
                        x.UnidadesTotal,
                        x.UnidadesDisponiveis,
                        Usuarios = x.Usuarios.Select(s => s.Id).ToList()
                    }).AsNoTracking().FirstOrDefaultAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "GET",
                    Descricao = $"Consulta de empreendimento {empreendimentoId}",
                    Controller = "Empreendimento",
                    NewValue = JsonConvert.SerializeObject(user),
                    OldValue = "N/A"
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
        [Route("create-empreendimento")]
        public async Task<IActionResult> CreateEmpreendimentoAsync([FromBody] EmpreendimentoViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var empreendimento = new Empreendimento
                {
                    Cor = model.Cor,
                    Nome = model.Nome.ToUpper(),
                    DataAlteracao = DateTime.Now,
                    UnidadesTotal = model.UnidadesTotal,
                    Localidade = model.Localidade.ToUpper(),
                    Construtora = model.Construtora.ToUpper(),
                    UsuarioAlteracao = long.Parse(loggedUserId),
                    UnidadesDisponiveis = model.UnidadesDisponiveis,
                };

                foreach (var usuarioId in model.Usuarios)
                {
                    var userId = usuarioId;
                    var usuario = await _Db.Usuarios.Include(i => i.Empreendimentos).FirstOrDefaultAsync(e => e.Id == userId);

                    if (usuario != null)
                    {
                        empreendimento.Usuarios.Add(usuario);
                    }
                    else
                    {
                        _Logger.LogWarning("Empreendimento com ID {UsuarioId} não encontrado.", usuarioId);

                    }
                }

                _Db.Empreendimentos.Add(empreendimento);
                await _Db.SaveChangesAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    Descricao = "Criação de um empreendimento",
                    Controller = "Empreendimento",
                    NewValue = JsonConvert.SerializeObject(empreendimento),
                    OldValue = null,
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Empreendimento criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-empreendimento")]
        public async Task<IActionResult> UpdateEmpreendimentoAsync([FromBody] EmpreendimentoViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();


                var empreendimento = await _Db.Empreendimentos.Include(i => i.Usuarios).FirstOrDefaultAsync(u => u.Id == model.Id);

                if (empreendimento == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Empreendimento não encontrado.",
                    });
                }

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(empreendimento, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                empreendimento.Cor = model.Cor;
                empreendimento.Nome = model.Nome.ToUpper();
                empreendimento.DataAlteracao = DateTime.Now;
                empreendimento.UnidadesTotal = model.UnidadesTotal;
                empreendimento.Localidade = model.Localidade.ToUpper();
                empreendimento.Construtora = model.Construtora.ToUpper();
                empreendimento.UsuarioAlteracao = long.Parse(loggedUserId);
                empreendimento.UnidadesDisponiveis = model.UnidadesDisponiveis;

                empreendimento.Usuarios.Clear();

                foreach (var userId in model.Usuarios)
                {
                    var usuarios = await _Db.Usuarios.Include(i => i.Empreendimentos).FirstOrDefaultAsync(e => e.Id == userId);

                    if (empreendimento != null)
                    {
                        empreendimento.Usuarios.Add(usuarios);
                    }
                    else
                    {
                        _Logger.LogWarning("Empreendimento com ID {userId} não encontrado.", userId);
                    }
                }

                await _Db.SaveChangesAsync();

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(empreendimento, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    Descricao = "Atualização de um empreendimento",
                    Controller = "Empreendimento",
                    NewValue = newValue,
                    OldValue = oldValue,
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Empreendimento atualizado com sucesso.",
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
