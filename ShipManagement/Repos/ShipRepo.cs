using Microsoft.EntityFrameworkCore;
using ShipManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShipManagement.Repos
{
    public class ShipRepo : IShipRepo
    {
        private readonly ShipContext _shipContext;

        public ShipRepo(ShipContext shipContext)
        {
            _shipContext = shipContext;
        }

        public async Task<bool> DeleteShip(Guid ID)
        {
            bool result;

            try
            {
                var ship = new Ship { ID = ID };
                _shipContext.Remove(ship);
                var change = await _shipContext.SaveChangesAsync();
                result = change > 0;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Record does not exist in the database");
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public async Task<Ship> GetShip(Guid ID)
        {
            var ship = await _shipContext.Ships.FirstOrDefaultAsync((ship) => ship.ID == ID);
            return ship;
        }

        public async Task<List<Ship>> GetShips(int Page = 0, int shipsPerPage = 10)
        {
            var result = await _shipContext.Ships.Take(shipsPerPage).Skip(Page * shipsPerPage).ToListAsync();
            return result;
        }

        public async Task<List<Ship>> GetAllShips()
        {
            var result = await _shipContext.Ships.ToListAsync();
            return result;
        }

        public async Task<Ship> InsertShip(Ship ship)
        {
            if (ship.ID == null)
                ship.ID = Guid.NewGuid();

            await _shipContext.AddAsync(ship);
            _shipContext.SaveChanges();

            return ship;
        }

        public async Task<Ship> UpdateShip(Ship ship)
        {
            _shipContext.Update(ship);
            await _shipContext.SaveChangesAsync();

            return ship;
        }
    }
}
