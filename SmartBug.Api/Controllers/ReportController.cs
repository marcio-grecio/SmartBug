using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data.Entity;

namespace SmartBug.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReportController : BaseController
    {
        [HttpGet]
        [Route("get-select-all-empreendimento")]
        public async Task<IActionResult> GetSelectAllEmpreendimentoAsync(long userId)
        {
            var empreendimentos = await _Db.Usuarios
                .Where(x => x.Id == userId)
                .SelectMany(x => x.Empreendimentos)
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

            return Ok(empreendimentos);
        }

    }
}
