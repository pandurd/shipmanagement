using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShipManagement.Models
{
    public class Ship
    {
        [Key]
        public Guid? ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Length { get; set; }

        [Required]
        public decimal Width { get; set; }

        [Required]
        //regex for AAAA-1111-A1 
        [RegularExpression(@"^[A-Z]{4}-[0-9]{4}-[A-Z]{1}[0-9]{1}$", ErrorMessage = "Invalid ship code")]
        public string Code { get; set; }
    }
}
