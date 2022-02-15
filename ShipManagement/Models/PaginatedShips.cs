using System.Collections.Generic;

namespace ShipManagement.Models
{
    public class PaginatedShips
    {
        public List<Ship> Ships { get; set; }
        public int ShipsCount { get; set; }

    }
}
