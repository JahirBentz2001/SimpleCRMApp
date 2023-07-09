using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using CRMApp.Domain.Data;
using CRMApp.Domain.Models;
using CRMApp.Domain.Errors;
using CRMApp.ReadModels;
using CRMApp.DTOs;

namespace CRMApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomerController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<CustomerRm>> List()
        {
            if(!_dbContext.Customers.Any())
                return NoContent();

            // Create a list of Customer Read Model objects to return
            var customers = _dbContext.Customers
                .Select(c => new CustomerRm(
                    c.Id,
                    c.FirstName,
                    c.LastName,
                    c.Email))
                .ToList();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<CustomerRm> Get(Guid id)
        {
            var customer = _dbContext.Customers.FirstOrDefault(c => c.Id == id);

            if(customer == null)
                return NotFound();

            // Create a new Customer Read Model object to return
            var customerRm = new CustomerRm(
                customer.Id,
                customer.FirstName,
                customer.LastName,
                customer.Email);

            return Ok(customerRm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(CustomerDto customerDto)
        {
            // Check if customer already exists by email or by first and last name
            var customer = _dbContext.Customers.FirstOrDefault(c => 
                c.Email == customerDto.Email ||
                (c.FirstName == customerDto.FirstName && c.LastName == customerDto.LastName));

            if(customer != null)
                return Conflict(new CustomerAlreadyExistsException());

            customer = new Customer(
                new Guid(),
                customerDto.FirstName!,
                customerDto.LastName!,
                customerDto.Email!);

            // Check validation results for the customer before saving it to the database
            var validationResults = customer.ValidationResults();

            if(validationResults != null)
                return BadRequest(validationResults);

            // Add and save the customer to the database
            await _dbContext.AddAsync(customer);

            await _dbContext.SaveChangesAsync();

            // Return the new customer object created
            return CreatedAtAction(nameof(Get), new { id = customer.Id }, customer);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(CustomerDto customerDto)
        {
            var customer = _dbContext.Customers.FirstOrDefault(c => c.Id == customerDto.Id);

            if(customer == null)
                return NotFound();

            // Check validation results for the customer before saving it to the database
            if(!string.IsNullOrWhiteSpace(customerDto.FirstName))
                customer.FirstName = customerDto.FirstName;

            if(!string.IsNullOrWhiteSpace(customerDto.LastName))
                customer.LastName = customerDto.LastName;

            if(!string.IsNullOrWhiteSpace(customerDto.Email))
                customer.Email = customerDto.Email;

            // Check validation results for the customer before saving it to the database
            var validationResults = customer.ValidationResults();

            if(validationResults != null)
                return BadRequest(validationResults);

            // Save the modified customer to the database
            _dbContext.Update(customer);

            await _dbContext.SaveChangesAsync();

            // If the process reach this point, then the customer was updated successfully
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var customer = _dbContext.Customers.FirstOrDefault(c => c.Id == id);

            if(customer == null)
                return NotFound();

            _dbContext.Remove(customer);

            await _dbContext.SaveChangesAsync();

            // If the process reach this point, then the customer was deleted successfully
            return NoContent();
        }
    }
}