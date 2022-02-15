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

        public ShipRepo()
        {

        }

        public ShipRepo(ShipContext shipContext)
        {
            _shipContext = shipContext;
        }

        public virtual async Task<bool> DeleteShip(Guid ID)
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

        public virtual async Task<Ship> GetShip(Guid ID)
        {
            var ship = await _shipContext.Ships.FirstOrDefaultAsync((ship) => ship.ID == ID);
            return ship;
        }

        public virtual async Task<PaginatedShips> GetShips(int Page = 1, int shipsPerPage = 5)
        {
            var result = new PaginatedShips();
            result.Ships = await _shipContext.Ships.Skip((Page - 1) * shipsPerPage).Take(shipsPerPage).ToListAsync();
            result.ShipsCount = await _shipContext.Ships.CountAsync();
            return result;
        }

        public virtual async Task<List<Ship>> GetAllShips()
        {
            var result = await _shipContext.Ships.ToListAsync();
            return result;
        }

        public virtual async Task<Ship> InsertShip(Ship ship)
        {
            if (ship.ID == null)
                ship.ID = Guid.NewGuid();

            await _shipContext.AddAsync(ship);
            _shipContext.SaveChanges();

            return ship;
        }

        public virtual async Task<Ship> UpdateShip(Ship ship)
        {
            _shipContext.Update(ship);
            await _shipContext.SaveChangesAsync();

            return ship;
        }
    }
}
