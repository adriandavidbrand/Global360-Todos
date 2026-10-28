using Microsoft.EntityFrameworkCore;
using TodoData;

namespace TodoData;

public class TodoRepository(TodoDbContext dbContext) : ITodoRepository
{
    private readonly TodoDbContext dbContext = dbContext;

    public async Task<IReadOnlyList<Todo>> GetByDateAsync(DateTime date)
    {
        return await dbContext.Todos
            .AsNoTracking()
            .Where(t => t.Date.Date == date.Date)
            .OrderBy(t => t.Id)
            .ToListAsync();
    }

    public async Task<Todo> AddAsync(Todo todo)
    {
        dbContext.Todos.Add(todo);
        await dbContext.SaveChangesAsync();
        return todo;
    }

    public async Task<bool> UpdateAsync(Todo todo)
    {
        var existing = await dbContext.Todos.FindAsync(todo.Id);
        if (existing is null) return false;

        existing.Name = todo.Name;
        existing.Date = todo.Date;
        existing.Complete = todo.Complete;
        await dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var current = await dbContext.Todos.FindAsync(id);
        if (current is null) return false;

        dbContext.Todos.Remove(current);
        await dbContext.SaveChangesAsync();
        return true;
    }
}
