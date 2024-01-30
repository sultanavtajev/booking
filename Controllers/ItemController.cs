using Microsoft.AspNetCore.Mvc;
using MyShop.Models;

namespace MyShop.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase
{
    // Declaring private read-only fields. ItemDbContext interacts with the database
    private readonly ItemDbContext context;

    public ItemController(ItemDbContext context)
    {
        this.context = context;
    }

    // Getting all items from ItemDbContext
    public async Task<IEnumerable<Item>> Table()
    {
        // Returning the items from ItemDbContext as an array
        return context.Items.ToArray();
    }

    // Used when creating a new property
    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Create(Item item)
    {
        if (ModelState.IsValid)
        {
            // Adding the item to the database
            context.Add(item);
            // Saving the changes asynchronously
            await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return CreatedAtAction("CreateItem", new { id = item.ItemId }, item);
    }

    // Used when deleting a property
    [HttpPost]
    [Route("delete")]
    public async Task<IActionResult> Delete(Item item)
    {
        if (ModelState.IsValid)
        {
            // Removing an item from ItemDbContext
            context.Remove(item);
            // Saving the changes asynchronously
            await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return CreatedAtAction("DeleteItem", new { id = item.ItemId }, item);
    }

    // Used when updating property
    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> Update(Item item)
    {
        if (ModelState.IsValid)
        {
            // Updating the item using ItemDbContext
            context.Update(item);
            // Saving the changes asynchronously
            await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return CreatedAtAction("UpdateItem", new { id = item.ItemId }, item);
    }
}
