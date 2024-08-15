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
    public class EmpreendimentoController : BaseController
    {

        private readonly ILogger<EmpreendimentoController> _Logger;

        public EmpreendimentoController(ILogger<EmpreendimentoController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllEmpreendimentosAsync()
        {
            var empreendimentos = await _Db.Empreendimentos
                .Select(f => new { f.Id, Nome = f.Nome.ToUpper() })
                .ToListAsync();

             return Ok(empreendimentos);
        }
    }
}
