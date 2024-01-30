using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        [Required]
        public string? FromDateDay { get; set; }
        [Required]
        public string? ToDateDay { get; set; }
        public string? PublisherId { get; set; }
        [Range(0, int.MaxValue)]
        public int? TotalDays { get; set; }

        // Foreign keys from Properties-table
        public virtual Item? Item { get; set; }
        public int ItemId { get; set; }
        public string? Name { get; set; }

        // Adding UserId and User to the model in order to enter the Id from the AspNetUsers table into the Bookings table
        // Source: https://gavilan.blog/2018/04/15/relationship-between-tables-and-aspnetusers/
        public string? UserId { get; set; }
        public virtual IdentityUser? User { get; set; }

        public string? ImageUrl { get; set; }

        public string? BookerUserName { get; set; }
        public string? PublisherUserName { get; set; }

        public decimal? PricePerDay { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
