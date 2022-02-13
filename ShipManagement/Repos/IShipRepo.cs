using ShipManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShipManagement.Repos
{
    public interface IShipRepo
    {
        Task<List<Ship>> GetShips(int Page, int shipsPerPage);
        Task<List<Ship>> GetAllShips();
        Task<Ship> GetShip(Guid ID);
        Task<Ship> InsertShip(Ship ship);
        Task<bool> DeleteShip(Guid shipID);
        Task<Ship> UpdateShip(Ship ship);
    }
}
