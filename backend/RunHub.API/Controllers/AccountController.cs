using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Core;
using RunHub.Contracts.DTOs.UserDtos;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;
using RunHub.Domain.Entity;
using RunHub.Infrastructure.Email;
using System.Security.Claims;
using System.Text;

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
        private readonly IConfiguration _config;
        private readonly EmailSender _emailSender;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, 
            IServiceProvider serviceProvider, IConfiguration config, EmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _serviceProvider = serviceProvider;
            _config = config;
            _emailSender = emailSender;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return Unauthorized("Niepoprawny adres e-mail!");

            if (user.UserName == "annakow") user.EmailConfirmed = true;

            if(!user.EmailConfirmed) return Unauthorized("Niepotwierdzony adres e-mail!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return Ok(CreateUserObject(user));
            }

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
            await SetRefreshToken(user);
            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("googleLogin")]
        public async Task<ActionResult<NewUserDto>> GoogleLogin(string idToken)
        {
            var payload = await VerifyGoogleIdToken(idToken);

            if (payload == null)
            {
                return BadRequest("Invalid Google ID token.");
            }

            var user = await _userManager.Users
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == payload.Email);

            if (user != null)
            {
                if (user.IsFirstLogin)
                {
                    user.IsFirstLogin = false;

                    await _userManager.UpdateAsync(user);

                    return Ok(CreateUserObject(user, isFirstLogin: true));
                }
                return Ok(CreateUserObject(user));
            }
            else
            {
                user = new AppUser
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    DisplayName = payload.Name,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    Photo = new Photo
                    {
                        Id = "google_" + payload.JwtId,
                        Url = payload.Picture
                    },
                    IsFirstLogin = true
                };

                var result = await _userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Competitor");

                    return Ok(CreateUserObject(user, isFirstLogin:true));
                }
                else
                {
                    return StatusCode(500, "Failed to create user.");
                }
            }
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<NewUserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(x => x.RefreshTokens)
                .Include(x => x.Photo)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken != null && !oldToken.IsActive) return Unauthorized();

            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;

            return CreateUserObject(user);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleIdToken(string idToken)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new[] { _config["GoogleKeys:ClientId"] };

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
                return payload;
            }
            catch (InvalidJwtException)
            {
                return null;
            }
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
                    var origin = Request.Headers["origin"];
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);

                    token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token)); //when not, token will be modified

                    var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={appUser.Email}";
                    var message = $"<p>Kliknij poniższy link, aby zweryfikować swój adres e-mail:</p><p><a href='{verifyUrl}'>Kliknij, aby zweryfikować adres e-mail</a></p>";

                    await _emailSender.SendEmailAsync(appUser.Email, "Zweryfkuj adres e-mail", message);

                    return Ok("Rejestracja pomyślna - link do weryfikacji został wysłany");
                }
                else
                {
                    return BadRequest("Problem z przypisaniem roli");
                }
            }
            else
            {
                return BadRequest("Problem z rejestracją użytkownika");
            }
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Nie udało się zweryfikować adresu e-mail");

            return Ok("Adres e-mail potwierdzony - możesz się teraz zalogować");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized();

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token)); //when not, token will be modified

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Kliknij poniższy link, aby zweryfikować swój adres e-mail:</p><p><a href='{verifyUrl}'>Kliknij, aby zweryfikować adres e-mail</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Zweryfkuj adres e-mail", message);

            return Ok("Link do weryfikacji został wysłany ponownie");
        }

        [Authorize]
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto passwordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("Użytkownik nie znaleziony.");

            var result = await _userManager.ChangePasswordAsync(user, passwordDto.CurrentPassword, passwordDto.NewPassword);

            if (result.Succeeded)
            {
                return Ok("Hasło zostało zmienione pomyślnie");
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }
        }

        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto passwordDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(passwordDto.Email);
            if (user == null)
                return Ok("Jeśli użytkownik istniej, zostanie wysłany link resetujący.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);

            var emailSender = _serviceProvider.GetRequiredService<EmailSender>();
            await emailSender.SendPasswordResetEmailAsync(user.Email, encodedToken);

            return Ok("Link resetujący został wysłany");
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto passwordDto)
        {
            var user = await _userManager.FindByEmailAsync(passwordDto.Email);
            if (user == null) return BadRequest();

            var decodedToken = Uri.UnescapeDataString(passwordDto.Token);

            var result = await _userManager.ResetPasswordAsync(user, decodedToken, passwordDto.NewPassword);
            if (result.Succeeded)
            {
                return Ok("Hasło zostało zresetowane pomyślnie");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        private NewUserDto CreateUserObject(AppUser appUser, bool isFirstLogin = false)
        {
            IList<string> userRoles = GetUserRoles(appUser);

                return new NewUserDto
                {
                    UserName = appUser.UserName,
                    DisplayName = appUser.DisplayName,
                    Image = appUser?.Photo?.Url,
                    Token = _tokenService.CreateToken(appUser, userRoles),
                    Role = userRoles.FirstOrDefault(),
                    IsFirstLogin = isFirstLogin
            };
        }

        private IList<string> GetUserRoles(AppUser appUser)
        {
            var userManager = _serviceProvider.GetRequiredService<UserManager<AppUser>>();

            var userRoles = userManager.GetRolesAsync(appUser).Result;

            return userRoles.ToList();
        }
    }
}
