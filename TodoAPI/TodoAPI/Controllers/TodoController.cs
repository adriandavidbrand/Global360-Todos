using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using TodoData;

namespace TodoAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController(ITodoRepository repository) : ControllerBase
{
    private readonly ITodoRepository repository = repository;

    [HttpGet("{date}")]
    public async Task<ActionResult<IEnumerable<Todo>>> Get(DateTime date)
    {
        return Ok(await repository.GetByDateAsync(date));
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> Save(Todo todo)
    {
        if (todo.Id == 0)
        {
            todo = await repository.AddAsync(todo);
        }
        else
        {
            await repository.UpdateAsync(todo);
        }
        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        return Ok(await repository.DeleteAsync(id));
    }
}
