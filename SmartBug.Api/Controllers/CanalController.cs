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
    public class CanalController : BaseController
    {
        private readonly ILogger _Logger;
        public CanalController(ILogger<CanalController> logger)
        {
            _Logger = logger;
        }


        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllCanalAsync()
        {
            var empreendimentos = await _Db.Canais
                .Select(f => new
                {
                    f.Id,
                    f.Nome,
                })
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-select-all")]
        public async Task<IActionResult> GetSelectAllEmpreendimentoAsync()
        {
            var canais = await _Db.Canais
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

            return Ok(canais);
        }


        [HttpGet]
        [Route("get-canal")]
        public async Task<IActionResult> GetCanalAsync(long canalId)
        {
            try
            {
                var canal = await _Db.Canais
                    .Where(x => x.Id == canalId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Nome,
                    }).AsNoTracking().FirstOrDefaultAsync();

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "GET",
                    Descricao = "Consulta de um canal",
                    Controller = "Canal",
                    NewValue = $"Consulta realizada com sucesso para o canal {canalId}",
                    OldValue = "N/A"
                });

                return Ok(canal);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create-canal")]
        public async Task<IActionResult> CreateCanalAsync([FromBody] CanalViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var canal = new Canal
                {
                    Nome = model.Nome.ToUpper(),
                    DataAlteracao = DateTime.Now,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "POST",
                    Descricao = "Criação de um canal",
                    Controller = "Canal",
                    NewValue = JsonConvert.SerializeObject(canal),
                    OldValue = "N/A"
                });

                _Db.Canais.Add(canal);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Canal criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-canal")]
        public async Task<IActionResult> UpdateCanalAsync([FromBody] CanalViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var canal = await _Db.Canais
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                if (canal == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Canal não encontrado.",
                    });
                }

                // Captura o valor antigo do objeto antes das alterações
                var oldValue = JsonConvert.SerializeObject(canal, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                // Atualiza o objeto com os novos valores
                canal.Nome = model.Nome.ToUpper();
                canal.DataAlteracao = DateTime.Now;
                canal.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                // Captura o valor novo do objeto após as alterações
                var newValue = JsonConvert.SerializeObject(canal, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                // Registra a auditoria
                await PublishAuditoria(new AuditoriaViewModel
                {
                    Tipo = "PUT",
                    Descricao = "Atualização de um canal",
                    Controller = "Canal",
                    NewValue = newValue,
                    OldValue = oldValue,
                });

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Canal atualizado com sucesso.",
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
