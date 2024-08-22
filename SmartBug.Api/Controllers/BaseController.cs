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

        internal (string loggedUserId, string loggedUserName) GetLoggedUserInfo()
        {
            var loggedUserId = User.FindFirst("id")?.Value;
            var loggedUserName = User.FindFirst("name")?.Value;
            return (loggedUserId, loggedUserName);
        }
    }
}
