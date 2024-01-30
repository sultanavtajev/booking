using Microsoft.AspNetCore.Mvc;
using MyShop.Models;

namespace MyShop.Controllers
{
    [ApiController]
    [Route("book")]
    public class BookController : ControllerBase
    {
        // Declaring private read-only fields. ItemDbContext interacts with the database, UserManager<IdentityUser> manages user-accounts.
        private readonly ItemDbContext context;

        public BookController(ItemDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Booking>> Table()
        {
            // Returning the bookings from ItemDbContext as an array
            return context.Bookings.ToArray();
        }

        // Used when creating a booking
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Booking booking)
        {
            if (ModelState.IsValid)
            {
                // Adding the booking to ItemDbContext
                context.Add(booking);
                // Saving the changes asynchronously
                await context.SaveChangesAsync();
                return Ok(booking);
            }

            return CreatedAtAction("CreateBooking", new { id = booking.BookingId }, booking);
        }
    }
}
