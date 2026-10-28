using Microsoft.AspNetCore.Mvc;
using Moq;
using TodoAPI.Controllers;
using TodoData;

namespace TodoAPI.Tests.Controllers;

public class TodosControllerTests
{
    private static readonly DateTime Today = DateTime.Now;
    private readonly Mock<ITodoRepository> repository = new();
    private readonly TodoController controller;

    public TodosControllerTests() => controller = new TodoController(repository.Object);

    [Fact]
    public async Task Get_ReturnsOkWithTodosFromRepository()
    {
        Todo[] todos = [
            new() { Name = "Check Email", Date = Today }
        ];
        repository.Setup(r => r.GetByDateAsync(Today)).ReturnsAsync(todos);

        var result = await controller.Get(Today);

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(todos, ok.Value);
    }
}
