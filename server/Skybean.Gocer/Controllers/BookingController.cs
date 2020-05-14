using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HashidsNet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Skybean.Gocer.Models;

namespace Skybean.Gocer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {        
        private readonly ILogger<BookingController> _logger;

        public BookingController(ILogger<BookingController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (var context = new AppContext())
            {
                try
                {
                    var bookings = await (from b in context.Bookings
                                          join o in context.Organizations on b.OrganizationId equals o.Id
                                          orderby b.DateTimeOfBooking descending
                                          select new
                                          {
                                              id = b.Id,
                                              dateTime = b.DateTimeOfBooking,
                                              orgName = o.Name,
                                              orgAddress = o.Address,
                                              orgProvince = o.Province,
                                              orgCity = o.City,
                                              orgCountry = o.Country,
                                              orgZipCode = o.ZipCode
                                          }).ToArrayAsync();
                    return Ok(bookings);
                }
                catch (Exception ex)
                {
                    return BadRequest(JsonConvert.SerializeObject(new { error = ex.Message }));
                }
                
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(BookingModel model)
        {
            using (var context = new AppContext())
            {
                try
                {
                    model.Timestamp = DateTime.UtcNow;

                    var salt = model.Timestamp.ToString("o") + model.Timestamp.Millisecond + model.DateTimeOfBooking.ToString("o") + ":" + model.UserId + model.OrganizationId;

                    var hashids = new Hashids(salt, 6);
                    var id = hashids.Encode(1, 2, 3);

                    model.Id = id;
                    
                    
                    var bookings = await context.Bookings.AddAsync(model);
                    await context.SaveChangesAsync();

                    return Ok(model);
                }
                catch (Exception ex)
                {
                    return BadRequest(JsonConvert.SerializeObject(new { error = ex.Message }));
                }
            }
        }
    }
}
