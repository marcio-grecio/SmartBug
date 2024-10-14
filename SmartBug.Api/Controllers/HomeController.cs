using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Api.Hubs;

namespace SmartBug.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger _Logger;
        public HomeController(ILogger<HomeController> logger)
        {
            _Logger = logger;
        }

        [HttpGet]
        [Route("/")]
        public IActionResult Index()
        {
            return Ok(new
            {
                online = true,
            });
        }

        [HttpGet]
        [Route("/Conectados")]
        public IActionResult Conectados()
        {
            var result = SignalRHub.SignalRConnections.Select(x => x.Value).ToList();
            return Ok(result);
        }
    }
}
