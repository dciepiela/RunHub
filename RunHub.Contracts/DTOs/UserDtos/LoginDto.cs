﻿using System.ComponentModel.DataAnnotations;

namespace RunHub.Contracts.DTOs.UserDtos
{
    public class LoginDto
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
