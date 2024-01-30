using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyShop.Models;
public class Item
{
    public int ItemId { get; set; }

    [RegularExpression(@"[0-9a-zA-ZÊ¯Â∆ÿ≈. \-]{2,20}", ErrorMessage = "The Name must be numbers or letters and between 2 to 20 characters.")]
    [Display(Name = "Property name")]
    public string Name { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "The Price must be greater than 0.")]
    public decimal Price { get; set; }

    [StringLength(200)]
    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? ImageUrl2 { get; set; }

    public string? ImageUrl3 { get; set; }

    // Adding new columnns to the database
    public string? Location { get; set; }

    public string PropertyType { get; set; } = string.Empty;

    public int Rooms { get; set; }

    public int Beds { get; set; }

    // Adding amenities
    public bool HasWifi { get; set; }

    public bool HasTV { get; set; }

    public bool HasKitchen { get; set; }

    public bool HasWashingMachine { get; set; }

    public bool HasFreeParking { get; set; }

    public bool HasPaidParking { get; set; }

    public bool HasAirCondition { get; set; }

    public bool HasPool { get; set; }

    // navigation property
    //[JsonPropertyName("ItemAmenities")]
    //public virtual List<ItemAmenity> ItemAmenities { get; set; } = new List<ItemAmenity>();

    // Adding UserId and User to the model in order to enter the Id from the AspNetUsers table into the Items table
    // Source: https://gavilan.blog/2018/04/15/relationship-between-tables-and-aspnetusers/
    public string? UserId { get; set; }

    public virtual IdentityUser? User { get; set; }

    public string? UserName { get; set; }
}