using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Models.ViewModel;
using System.Data.Entity;

namespace SmartBug.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : BaseController
    {
        private readonly ILogger<UserController> _Logger;

        public UserController(ILogger<UserController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllUsersAsync(long enterpriseId)
        {
            try
            {
                var users = await _Db.Usuarios
                   .Where(s => s.Empreendimentos.Any(a => a.Id == enterpriseId))
                   .Select(s => new
                   {
                       s.Id,
                       s.Nome,
                       s.Email,
                       s.Perfil,
                       s.IsActive,
                   }).ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpPost]
        [Route("create-user")]
        public async Task<IActionResult> CreateUserAsync([FromBody] UsuarioViewModel model)
        {
            try
            {
                //var user = new Usuario
                //{
                //    Nome = model.Nome,
                //    Email = model.Email,
                //    Senha = model.Senha,
                //    Perfil = model.Perfil,
                //    IsActive = model.IsActive,
                //    Empreendimentos = new List<Empreendimento> { new Empreendimento { Id = model.EmpreendimentoId } }
                //};

                //_Db.Usuarios.Add(user);
                //await _Db.SaveChangesAsync();

                //return Ok(user);
                return Ok();
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
