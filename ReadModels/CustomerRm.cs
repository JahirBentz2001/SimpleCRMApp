using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApp.ReadModels
{
    public record CustomerRm(
        Guid Id,
        string FirstName,
        string LastName,
        string Email);
}