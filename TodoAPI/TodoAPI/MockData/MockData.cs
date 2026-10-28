using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using TodoData;

namespace TodoAPI;

public class MockData
{
    public static void Create(SqliteConnection connection)
    {
        var options = new DbContextOptionsBuilder<TodoDbContext>()
            .UseSqlite(connection)
            .Options;

        using var dbContext = new TodoDbContext(options);
        dbContext.Database.EnsureCreated();
        var today = DateTime.Now.Date;
        dbContext.Todos.AddRange([
            new Todo { Name = "Check Email", Date = today.AddHours(9) },
            new Todo { Name = "Pickup dry cleaning", Date = today.AddHours(12.5) },
            new Todo { Name = "Phone Mum", Date = today.AddHours(13) },
            new Todo { Name = "Finish report", Date = today.AddHours(16) },
        ]);
        dbContext.SaveChanges();
    }
}