using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBug.Context;

namespace SmartBug.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly Conexao _Db;

        public BaseController()
        {
            _Db = new Conexao();
        }
    }
}
