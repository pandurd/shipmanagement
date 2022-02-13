using Microsoft.EntityFrameworkCore;
using ShipManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShipManagement.Repos
{
    public class ShipContext : DbContext
    {
        public ShipContext(DbContextOptions options) : base(options)
        {    
        }
        public DbSet<Ship> Ships { get; set; }
    }
}
