using HashidsNet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Skybean.Gocer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skybean.Gocer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrganizationController : ControllerBase
    {
        private readonly ILogger<OrganizationController> _logger;

        public OrganizationController(ILogger<OrganizationController> logger)
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
                    var orgs = await context.Organizations.Take(50).ToArrayAsync();
                    return Ok(orgs);
                }
                catch (Exception ex)
                {
                    return BadRequest(JsonConvert.SerializeObject(new { error = ex.Message }));
                }

            }
        }


        [HttpGet]
        [Route("{keywords}")]
        public async Task<IActionResult> Get(string keywords)
        {
            using (var context = new AppContext())
            {                
                try
                {
                    var orgs = await (from o in context.Organizations
                                     where EF.Functions.Like(o.Name, $"{keywords}%")
                                     select o).ToListAsync();
                    return Ok(orgs);
                }
                catch (Exception ex)
                {
                    return BadRequest(JsonConvert.SerializeObject(new { error = ex.Message }));
                }

            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(OrganizationModel model)
        {
            using (var context = new AppContext())
            {
                try
                {
                    var timeNow = DateTime.UtcNow;

                    var salt = model.Name + ":" + timeNow.ToString("o") + model.Latitude + model.Longitude + model.ZipCode;

                    var hashids = new Hashids(salt, 6);
                    var id = hashids.Encode(1, 2, 3);

                    model.Id = id;
                    model.CreatedTime = timeNow;

                    var bookings = await context.Organizations.AddAsync(model);
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
