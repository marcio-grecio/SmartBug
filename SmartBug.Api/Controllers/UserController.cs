using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Models.ViewModel;
using System.Data.Entity;

namespace SmartBug.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
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

    }
}
