using RunHub.Domain.Entity;

namespace RunHub.Domain.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public AppUser Author { get; set; }
        public Race Race { get; set; }
        public DateTime CreateadAt { get; set; } = DateTime.UtcNow;
    }
}
