using System.ComponentModel.DataAnnotations;

namespace TodoData;

public class Todo
{
    public int Id { get; set; }

    [StringLength(256)]
    public string Name { get; set; } = string.Empty;
    
    public DateTime Date { get; set; }

    public bool Complete { get; set; }
}
