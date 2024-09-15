using Microsoft.AspNetCore.Mvc;
using SmartBug.Context;
using SmartBug.Models;
using SmartBug.Models.ViewModel;

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
        var loggedUserName = User.FindFirst("nome")?.Value;
        return (loggedUserId, loggedUserName);
    }

    protected async Task PublishAuditoria(AuditoriaViewModel model)
    {
        try
        {

        var (loggedUserId, loggedUserName) = GetLoggedUserInfo();

        var auditoria = new Auditoria
        {
            Tipo = model?.Tipo,
            UsuarioId = long.Parse(loggedUserId),
            NewValue = model?.NewValue,
            OldValue = model?.OldValue,
            Descricao = model?.Descricao,
            Controller = model?.Controller
        };

        _Db.Auditoria.Add(auditoria);
        await _Db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
