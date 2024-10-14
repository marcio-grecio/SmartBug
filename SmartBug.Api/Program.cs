using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SmartBug.Api.Hubs;
using SmartBug.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Registre o HttpClient e outros serviços aqui
builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "EnableCors",
        policy =>
        {
            policy
            .WithOrigins(
                "http://localhost:5173",
                "https://*.meetweb.com.br"
                )
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();

        });
});

// Adicione esta linha para registrar o SignalR
builder.Services.AddSignalR();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KeyValidationToken.Secret)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
    //item utilizado para debuggar o token
    //x.Events = new JwtBearerEvents
    //{
    //    OnAuthenticationFailed = context =>
    //    {
    //        Console.WriteLine("Authentication failed: " + context.Exception.Message);
    //        return Task.CompletedTask;
    //    },
    //    OnTokenValidated = context =>
    //    {
    //        Console.WriteLine("Token validated.");
    //        return Task.CompletedTask;
    //    },
    //    OnChallenge = context =>
    //    {
    //        Console.WriteLine("OnChallenge error: " + context.Error + " - " + context.ErrorDescription);
    //        return Task.CompletedTask;
    //    }
    //};

});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("EnableCors");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Registre o hub do SignalR aqui
app.MapHub<SignalRHub>("/Hubs/SignalHub");

app.MapControllers();

app.Run();
