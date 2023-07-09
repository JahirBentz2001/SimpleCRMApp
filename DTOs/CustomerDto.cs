using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApp.DTOs
{
    public record CustomerDto(Guid? Id, string? FirstName, string? LastName, string? Email);
}