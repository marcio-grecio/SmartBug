using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SmartBug.Models;
using SmartBug.Models.Enums;
using SmartBug.Models.ViewModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartBug.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : BaseController
    {
        private readonly ILogger<AuthController> _Logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _Logger = logger;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public IActionResult Login([FromBody] UserLoginViewModel model)
        {
            try
            {
                model.Senha = MD5Hash.CalculaHash(model.Senha);
                var user = _Db.Usuarios
                              .FirstOrDefault(x => x.Email == model.Login && x.Senha == model.Senha && x.IsActive == SituacaoEnum.Active);

                if (user == null)
                {
                    return NotFound("Email ou senha inválidos");
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KeyValidationToken.Secret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    //new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())

                    new Claim(JwtRegisteredClaimNames.Sub, user.Nome ?? ""),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Email, user.Email ?? ""),
                    new Claim("id", user.Id.ToString()),
                    new Claim("nome", user.Nome ?? ""),
                    new Claim("email", user.Email?? ""),
                    new Claim("ocupacao", user.Ocupacao),
                    new Claim("avatar", user.Avatar ?? ""),
                    new Claim("perfil", user.Perfil.ToString()),
                    new Claim("empreendimentos", JsonConvert.SerializeObject(user.Empreendimentos.Select(s => new { value = s.Id, label = s.Nome }))),
                };

                var token = new JwtSecurityToken(
                    issuer: user.Email,
                    audience: user.Email,
                    claims: claims,
                    expires: DateTime.Now.AddMonths(6),
                    signingCredentials: creds
                );

                var empreendimentos = user.Empreendimentos.Select(s => new GenericSelectOptions(s.Id, s.Nome));

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                var userModel = new UserAuthViewModel(
                    user.Id,
                    user.Nome,
                    user.Email,
                    user.Avatar,
                    user.Perfil,
                    empreendimentos
                );

                var userAuth = new UserToken
                {
                    Usuario = userModel,
                    Token = tokenString
                };

                return Ok(userAuth);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "Erro ao efetuar login");
                return StatusCode(500, "Ocorreu um erro desconhecido ao efetuar o login.");
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
