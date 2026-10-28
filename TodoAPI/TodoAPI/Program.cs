using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using TodoData;

var builder = WebApplication.CreateBuilder(args);

var connection = new SqliteConnection("DataSource=:memory:");
connection.Open();
TodoAPI.MockData.Create(connection);

// Add services to the container.

builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite(connection));

builder.Services.AddScoped<ITodoRepository, TodoRepository>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
