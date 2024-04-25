using System.ComponentModel.DataAnnotations;

namespace RunHub.Contracts.DTOs.UserDtos
{
    public class RegisterDto
    {
        //[Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        //[Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; }

        //[Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        //[Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        public string Nationality {  get; set; }
        public string Gender { get; set; }

        //[Required]
        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateOnly DateOfBirth { get; set; }

        //[Required(ErrorMessage = "Contact number is required")]
        //[RegularExpression(@"^\d{9}$", ErrorMessage = "Invalid contact number")]
        public string ContactNumber { get; set; }
        
        public string Club { get; set; }

        public AddressDto AddressDto { get; set; }
    }
}
