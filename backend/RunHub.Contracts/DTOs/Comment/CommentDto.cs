namespace RunHub.Contracts.DTOs.Comment
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public DateTime CreateadAt { get; set; } = DateTime.UtcNow;
        public string CommentText { get; set; }
        public string Username {  get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}
