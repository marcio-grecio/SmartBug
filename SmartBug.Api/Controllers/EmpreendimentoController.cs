using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Models;
using SmartBug.Models.Enums;
using SmartBug.Models.ViewModel;
using System.Data.Entity;
using System.Net;

namespace SmartBug.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmpreendimentoController : BaseController
    {

        private readonly ILogger<EmpreendimentoController> _Logger;

        public EmpreendimentoController(ILogger<EmpreendimentoController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-select-all")]
        public async Task<IActionResult> GetSelectAllEmpreendimentosAsync()
        {
            var empreendimentos = await _Db.Empreendimentos
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

             return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllEmpreendimentosAsync()
        {
            var empreendimentos = await _Db.Empreendimentos
                .Include(i=>i.Usuarios)
                .Select(f => new { 
                    f.Id, 
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
        public async Task<IActionResult> GetUserAsync(long empreendimentoId)
        {
            try
            {
                var user = await _Db.Empreendimentos
                    .Include(x => x.Usuarios)
                    .Where(x => x.Id == empreendimentoId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Nome,
                        x.Localidade,
                        x.Construtora,
                        x.UnidadesTotal,
                        x.UnidadesDisponiveis,
                        Usuarios = x.Usuarios.Select(s => s.Id).ToList()
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
        [Route("create-empreendimento")]
        public async Task<IActionResult> CreateEmpreendimentoAsync([FromBody] EmpreendimentoViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                var empreendimento = new Empreendimento
                {
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
                        _Logger.LogWarning($"Empreendimento com ID {usuarioId} não encontrado.");
                    }
                }

                _Db.Empreendimentos.Add(empreendimento);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Empreendimento criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("update-empreendimento")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] EmpreendimentoViewModel model)
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

                empreendimento.Nome = model.Nome.ToUpper();
                empreendimento.DataAlteracao = DateTime.Now;
                empreendimento.Localidade = model.Localidade.ToUpper();
                empreendimento.Construtora = model.Construtora.ToUpper();
                empreendimento.UsuarioAlteracao = long.Parse(loggedUserId);

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
                        _Logger.LogWarning($"Empreendimento com ID {userId} não encontrado.");
                    }
                }

                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Empreendimento atualizado com sucesso.",
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
