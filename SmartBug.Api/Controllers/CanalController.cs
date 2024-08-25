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
    public class CanalController : BaseController
    {

        private readonly ILogger<CanalController> _Logger;

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

                return Ok(canal);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
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
                _Logger.LogError(ex, ex.Message);
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

                canal.Nome = model.Nome.ToUpper();
                canal.DataAlteracao = DateTime.Now;
                canal.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Canal atualizado com sucesso.",
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
