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
    [Authorize]
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
        [Route("get-select-all")]
        public async Task<IActionResult> GetSelectAllUsuariosAsync()
        {
            var empreendimentos = await _Db.Usuarios
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

            return Ok(empreendimentos);
        }

        [HttpGet]
        [Route("get-all-users")]
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
                       s.Ocupacao,
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

        [HttpGet]
        [Route("get-user")]
        public async Task<IActionResult> GetUserAsync(long userId)
        {
            try
            {
                var user = await _Db.Usuarios
                    .Include(x => x.Empreendimentos)
                    .Where(x => x.Id == userId)
                    .Select(x => new 
                    {
                        x.Id,
                        x.Perfil,
                        x.Nome,
                        x.Email,
                        x.Senha,
                        x.Avatar,
                        x.Ocupacao,
                        IsActive = x.IsActive.ToString(),
                        Empreendimentos = x.Empreendimentos.Select(s => s.Id).ToList()
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
        [Route("create-user")]
        public async Task<IActionResult> CreateUserAsync([FromBody] UsuarioViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                bool isActive = model.IsActive == "1" || string.Equals(model.IsActive, "true", StringComparison.OrdinalIgnoreCase);

                var loginExist = await _Db.Usuarios.AnyAsync(u => u.Email == model.Email);
                if (loginExist)
                {
                    return Conflict(new
                    {
                        StatusCode = HttpStatusCode.Conflict,
                        Message = "Login já cadastrado.",
                    });
                }

                var user = new Usuario
                {
                    Email = model.Email,
                    Perfil = model.Perfil,
                    Avatar = model.Avatar,
                    Ocupacao = model.Ocupacao,
                    Nome = model.Nome.ToUpper(),
                    Senha = MD5Hash.CalculaHash(model.Senha),
                    UsuarioAlteracao = long.Parse(loggedUserId),
                    IsActive = isActive ? SituacaoEnum.Active : SituacaoEnum.Inactive,
                };

                foreach (var empreendimentoId in model.Empreendimentos)
                {
                    var empId = empreendimentoId;
                    var empreendimento = await _Db.Empreendimentos.Include(i => i.Usuarios).FirstOrDefaultAsync(e => e.Id == empId);

                    if (empreendimento != null)
                    {
                        user.Empreendimentos.Add(empreendimento);
                    }
                    else
                    {
                        _Logger.LogWarning($"Empreendimento com ID {empreendimentoId} não encontrado.");
                    }
                }

                _Db.Usuarios.Add(user);
                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Usuário criado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("update-user")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UsuarioViewModel model)
        {
            try
            {
                var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

                bool isActive = model.IsActive == "1" || string.Equals(model.IsActive, "true", StringComparison.OrdinalIgnoreCase);

                var user = await _Db.Usuarios.Include(i => i.Empreendimentos).FirstOrDefaultAsync(u => u.Id == model.Id);

                if (user == null)
                {
                    return NotFound(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Usuário não encontrado.",
                    });
                }

                if (!string.IsNullOrWhiteSpace(model.Senha))
                {
                    user.Senha = MD5Hash.CalculaHash(model.Senha);
                }

                user.Email = model.Email;
                user.Perfil = model.Perfil;
                user.Avatar = model.Avatar;
                user.Ocupacao = model.Ocupacao;
                user.Nome = model.Nome.ToUpper();
                user.IsActive = isActive ? SituacaoEnum.Active : SituacaoEnum.Inactive;
                user.UsuarioAlteracao = long.Parse(loggedUserId);
                user.DataAlteracao = DateTime.Now;

                user.Empreendimentos.Clear();

                foreach (var empreendimentoId in model.Empreendimentos)
                {
                    var empId = empreendimentoId;
                    var empreendimento = await _Db.Empreendimentos.Include(i => i.Usuarios).FirstOrDefaultAsync(e => e.Id == empId);

                    if (empreendimento != null)
                    {
                        user.Empreendimentos.Add(empreendimento);
                    }
                    else
                    {
                        _Logger.LogWarning($"Empreendimento com ID {empreendimentoId} não encontrado.");
                    }
                }

                await _Db.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = "Usuário atualizado com sucesso.",
                });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        public static class MD5Hash
        {
            public static string CalculaHash(string Senha)
            {
                try
                {
                    byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(Senha);
                    byte[] hash = System.Security.Cryptography.MD5.HashData(inputBytes);
                    System.Text.StringBuilder sb = new();
                    for (int i = 0; i < hash.Length; i++)
                    {
                        sb.Append(hash[i].ToString("X2"));
                    }
                    return sb.ToString();
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }
    }
}
