using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApp.Domain.Errors
{
    public class CustomerAlreadyExistsException : Exception
    {
        public CustomerAlreadyExistsException() 
            : base("The customer already exists.")
        { }
    }
}