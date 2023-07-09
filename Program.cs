using Microsoft.OpenApi.Models;
using CRMApp.Domain.Data;
using CRMApp.Domain.Models;

var builder = WebApplication.CreateBuilder(args);

// Add Database context
builder.Services.AddDbContext<ApplicationDbContext>();

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add Swagger Service
builder.Services.AddSwaggerGen(setup => 
{
    setup.AddServer(new OpenApiServer
    {
        Description = "OpenAPI Development Server",
        Url = "http://localhost:5000"
    });

    setup.DescribeAllParametersInCamelCase();

    setup.CustomOperationIds(apiDesc =>
        $"{apiDesc.ActionDescriptor.RouteValues["action"] + apiDesc.ActionDescriptor.RouteValues["controller"]}");
});

builder.Services.AddScoped<ApplicationDbContext>();

var app = builder.Build();

// Ensure that database is created
var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>();

dbContext.Database.EnsureCreated();

// Create Seed Data (fake data) if Customers Table is empty
if(!dbContext.Customers.Any())
{
    var customers = new List<Customer>()
    {
        new Customer(new Guid(), "John", "Doe", "john.doe@gmail.com"),
        new Customer(new Guid(), "Jane", "Smith", "jane.doe@hotmail.com"),
        new Customer(new Guid(), "Bob", "Ramirez", "bob.ramirez@gmail.com")
    };

    await dbContext.Customers.AddRangeAsync(customers);
    
    await dbContext.SaveChangesAsync();
}

// Set up CORS middleware policy to allow any origin, any header, and any method.
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

// Configure SwaggerUI for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger().UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
