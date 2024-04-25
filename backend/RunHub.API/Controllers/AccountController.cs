using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Core;
using RunHub.Contracts.DTOs.UserDtos;
using RunHub.Domain.Entity;
using RunHub.Infrastructure.Email;
using Serilog;
using System.Security.Claims;

namespace RunHub.API.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IServiceProvider _serviceProvider;


        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, 
            IServiceProvider serviceProvider)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _serviceProvider = serviceProvider;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            //var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

            var user = await _userManager.Users
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return Unauthorized("Niepoprawny adres e-mail!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return Ok(CreateUserObject(user));
            }
            //return Unauthorized("Username not found and/or password incorrect");
            return Unauthorized("Niepoprawne hasło!");

        }

        [AllowAnonymous]
        [HttpPost("registerCompetitor")]
        public async Task<IActionResult> RegisterCompetitor([FromBody] RegisterDto registerDto)
        {
            return await RegisterUser(registerDto, "Competitor");
        }

        [AllowAnonymous]
        [HttpPost("registerOrganizer")]
        public async Task<IActionResult> RegisterOrganizer([FromBody] RegisterDto registerDto)
        {
            return await RegisterUser(registerDto, "Organizer");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<NewUserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private async Task<IActionResult> RegisterUser(RegisterDto registerDto, string role)
        {
            if (await _userManager.Users.AnyAsync(user => user.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Nazwa użytkownika istnieje już w systemie");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Adres e-mail istnieje już w systemie");
                return ValidationProblem();
            }

            var appUser = new AppUser
            {
                DisplayName = registerDto.Username,
                UserName = registerDto.Username,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Nationality = registerDto.Nationality,
                Gender = registerDto.Gender,
                DateOfBirth = registerDto.DateOfBirth,
                ContactNumber = registerDto.ContactNumber,
                Club = registerDto.Club,
                Address = registerDto?.AddressDto != null ? new Address
                {
                    City = registerDto?.AddressDto.City,
                    Street = registerDto?.AddressDto.Street,
                    PostalCode = registerDto?.AddressDto.PostalCode
                } : null
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(appUser, role);

                if (roleResult.Succeeded)
                {
                    return Ok(CreateUserObject(appUser));
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }

        [Authorize]
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Get the currently logged-in user
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found.");

            // Change the user's password
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            // Check if the operation succeeded
            if (result.Succeeded)
            {
                return Ok("Hasło zostało zmienione pomyślnie");
            }
            else
            {
                // If it failed, add the errors to the ModelState and return it
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }
        }

        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
                // Optionally, consider returning Ok() to avoid enumeration attacks
                return Ok("If an account with this email exists, a reset link has been sent.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Encode the token to be URL safe
            var encodedToken = Uri.EscapeDataString(token);

            // Debug log the token
            Log.Information("Received Token for Validation => {@encodedToken}", encodedToken);
            var emailSender = _serviceProvider.GetRequiredService<EmailSender>();
            await emailSender.SendPasswordResetEmailAsync(user.Email, encodedToken);

            return Ok("A reset link has been sent.");
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null) return BadRequest("Invalid request");

            // Decode the token received from the request
            var decodedToken = Uri.UnescapeDataString(resetPasswordDto.Token);

            //Log.Information($"Received Token for Validation: {decodedToken}");
            Log.Information("Received Token for Validation => {@decodedToken}",decodedToken);
            //_logger.LogInformation($"Received Token for Validation: {decodedToken}");

            var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDto.NewPassword);
            if (result.Succeeded)
            {
                return Ok("Password has been reset successfully");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        private NewUserDto CreateUserObject(AppUser appUser)
        {
            IList<string> userRoles = GetUserRoles(appUser);

            return new NewUserDto
            {
                UserName = appUser.UserName,
                DisplayName = appUser.DisplayName,
                Image = appUser?.Photo?.Url,
                Token = _tokenService.CreateToken(appUser, userRoles),
                Role = userRoles.FirstOrDefault()
            };
        }

        private IList<string> GetUserRoles(AppUser appUser)
        {
            // Get user manager instance
            var userManager = _serviceProvider.GetRequiredService<UserManager<AppUser>>();

            // Get roles associated with the user
            var userRoles = userManager.GetRolesAsync(appUser).Result;

            return userRoles.ToList();
        }
    }
}
