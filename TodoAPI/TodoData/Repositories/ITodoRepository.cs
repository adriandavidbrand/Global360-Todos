namespace TodoData;

public interface ITodoRepository
{
    Task<IReadOnlyList<Todo>> GetByDateAsync(DateTime date);
    Task<Todo> AddAsync(Todo todo);
    Task<bool> UpdateAsync(Todo todo);
    Task<bool> DeleteAsync(int id);
}
