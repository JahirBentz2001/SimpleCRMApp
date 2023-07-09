using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using CRMApp.Domain.Models;

namespace CRMApp.Domain.Data
{
    public class ApplicationDbContext : DbContext
    {
        // DbSets Section
        public DbSet<Customer> Customers => Set<Customer>();

        private readonly SqlConnectionStringBuilder _builder;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) 
        {
            _builder = new SqlConnectionStringBuilder()
            {
                DataSource = "localhost",
                UserID = "sa",
                Password = "g65A1#FqsQsB",
                InitialCatalog = "CRMApp",
                TrustServerCertificate = true
            };
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _builder.ConnectionString;

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}