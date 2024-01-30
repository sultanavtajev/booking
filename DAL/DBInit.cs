namespace MyShop.Models;

public static class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        ItemDbContext context = serviceScope.ServiceProvider.GetRequiredService<ItemDbContext>();
        //context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        // Seeding the database with items if there are none in the database
        if (!context.Items.Any())
        {
            var items = new List<Item>
            {
                new Item
                {
                    Name = "House",
                    Price = 150,
                    Description = "Nice house with great view",
                    ImageUrl = "/images/1.png",
                    ImageUrl2 = "/images/2.png",
                    ImageUrl3 = "/images/3.png",
                    Location = "Oslo",
                    PropertyType = "House",
                    Rooms = 2,
                    Beds = 2,
                    HasWifi = true,
                    HasTV = true,
                    HasAirCondition = true,
                    UserName = "testdb@gmail.com"
                },
                new Item
                {
                    Name = "Apartment",
                    Price = 200,
                    Description = "Nice apartment with great view",
                    ImageUrl = "/images/4.png",
                    ImageUrl2 = "/images/5.png",
                    ImageUrl3 = "/images/6.png",
                    Location = "Oslo",
                    PropertyType = "Apartment",
                    Rooms = 2,
                    Beds = 2,
                    HasWifi = true,
                    HasFreeParking = true,
                    HasAirCondition = true,
                    UserName = "testdb2@gmail.com"
                },
                new Item
                {
                    Name = "Cabin",
                    Price = 100,
                    Description = "Nice cabin with great view",
                    ImageUrl = "/images/Bergen1.png",
                    ImageUrl2 = "/images/Bergen2.png",
                    ImageUrl3 = "/images/Bergen3.png",
                    Location = "Bergen",
                    PropertyType = "Cabin",
                    Rooms = 1,
                    Beds = 1,
                    UserName = "testdb3@gmail.com"
                },
            };

            // Adding and saving the items to the database
            context.AddRange(items);
            context.SaveChanges();
        }

        context.SaveChanges();
    }
}
