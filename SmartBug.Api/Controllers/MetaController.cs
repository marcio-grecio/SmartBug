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
    public class MetaController : BaseController
    {

        private readonly ILogger<MetaController> _Logger;

        public MetaController(ILogger<MetaController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllMetaAsync()
        {
            var metas = await _Db.Metas
                .Include(i => i.Empreendimento)
                .Select(f => new
                {
                    f.Id,
                    f.Tipo,
                    f.DataFinal,
                    f.DataInicial,
                    f.Quantidade,
                    Empreendimento = f.Empreendimento.Nome.ToUpper(),
                    Construtora = f.Empreendimento.Construtora.ToUpper(),
                })
                .OrderByDescending(o => o.DataInicial)
                .ToListAsync();

            return Ok(metas);
        }

        [HttpGet]
        [Route("get-meta")]
        public async Task<IActionResult> GetVendaAsync(long metaId)
        {
            try
            {
                var meta = await _Db.Metas
                    .Where(x => x.Id == metaId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Tipo,
                        x.DataInicial,
                        x.DataFinal,
                        x.Quantidade,
                        x.EmpreendimentoId,
                    }).AsNoTracking().FirstOrDefaultAsync();

                return Ok(meta);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create-meta")]
        public async Task<IActionResult> CreateVendaAsync([FromBody] MetaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var meta = new Meta
                {
                    Tipo = model.Tipo,
                    DataFinal = model.DataFinal,
                    DataAlteracao = DateTime.Now,
                    Quantidade = model.Quantidade,
                    DataInicial = model.DataInicial,
                    EmpreendimentoId = model.EmpreendimentoId,
                    UsuarioAlteracao = long.Parse(loggedUserId),
                };

                _Db.Metas.Add(meta);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Meta criada com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-meta")]
        public async Task<IActionResult> UpdateVendaAsync([FromBody] MetaViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();


                var meta = await _Db.Metas
                    .FirstOrDefaultAsync(u => u.Id == model.Id);

                if (meta == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Meta não encontrada.",
                    });
                }

                meta.Tipo = model.Tipo;
                meta.DataFinal = model.DataFinal;
                meta.DataAlteracao = DateTime.Now;
                meta.Quantidade = model.Quantidade;
                meta.DataInicial = model.DataInicial;
                meta.EmpreendimentoId = model.EmpreendimentoId;
                meta.UsuarioAlteracao = long.Parse(loggedUserId);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Meta atualizada com sucesso.",
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
