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
        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(75, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100, MinimumLength = 5)]
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

        internal IList<ValidationResult>? ValidationResults()
        {
            // This validates the Customer object using DataAnnotations
            var customer = this;

            var validationContext = new ValidationContext(customer);

            var validationResults = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(customer, validationContext, validationResults, true);

            if(!isValid)
                return validationResults;

            return null;
        }
    }
}