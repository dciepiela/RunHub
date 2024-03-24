namespace RunHub.Contracts.DTOs.UserDtos
{
    public class NewUserDto
    {
        public string? UserName { get; set; }
        public string? DisplayName { get; set; }
        public string? Token { get; set; }

        public string? Role { get; set; }
    }
}
