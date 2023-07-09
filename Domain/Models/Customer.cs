using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApp.Domain.Models
{
    public class Customer
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MinLength(2), MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2), MaxLength(75)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [MinLength(5), MaxLength(100)]
        public string Email { get; set; }

        # pragma warning disable 8618
        public Customer(){}

        public Customer(
            Guid Id,
            string FirstName,
            string LastName,
            string Email)
        {
            this.Id = Id;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
        }
    }
}