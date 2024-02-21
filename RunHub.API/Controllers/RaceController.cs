using Microsoft.AspNetCore.Mvc;
using RunHub.Persistence;

namespace RunHub.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class RaceController:ControllerBase
    {
        private readonly DataContext _context;

        public RaceController(DataContext context)
        {
            _context = context;
        }
    }
}
