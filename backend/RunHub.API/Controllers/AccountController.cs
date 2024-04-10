using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Core;
using RunHub.Contracts.DTOs.UserDtos;
using RunHub.Domain.Entity;
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

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IServiceProvider serviceProvider)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
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
                    Country = registerDto?.AddressDto.Country,
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
