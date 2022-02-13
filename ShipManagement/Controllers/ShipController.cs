using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShipManagement.Models;
using ShipManagement.Repos;
using System;
using System.Threading.Tasks;
using Serilog.AspNetCore;

namespace ShipManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : ControllerBase
    {
        private readonly IShipRepo _shipRepo;
        private readonly ILogger<ShipController> _logger;
        public ShipController(IShipRepo shipRepo, ILogger<ShipController> logger)
        {
            _shipRepo = shipRepo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetShips([FromQuery] int Page = 0, [FromQuery] int shipsPerPage = 10)
        {
            var response = await _shipRepo.GetShips(Page, shipsPerPage);

            _logger.LogInformation("GetShips");

            if (response == null)
                return NotFound();  

            return Ok(response);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllShips()
        {
            var response = await _shipRepo.GetAllShips();
            return Ok(response);
        }

        [HttpGet]
        [Route("details")]
        public async Task<IActionResult> GetShip(Guid id)
        {
            var response = await _shipRepo.GetShip(id);

            if (response == null)
                return NotFound();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddShip([FromBody] Ship ship)
        {
            var response = await _shipRepo.InsertShip(ship);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateShip([FromBody] Ship ship)
        {
            var response = await _shipRepo.UpdateShip(ship);
            return Ok(response);
        }

        [HttpDelete]
        [Route("{shipID}")]
        public async Task<IActionResult> DeleteShip(Guid shipID)
        {
            var response = await _shipRepo.DeleteShip(shipID);
            return Ok(response);
        }
    }
}
