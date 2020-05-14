using Microsoft.EntityFrameworkCore;
using Skybean.Gocer.Models;

namespace Skybean.Gocer
{
    public class AppContext : DbContext
    {
        public DbSet<BookingModel> Bookings { get; set; }
        public DbSet<OrganizationModel> Organizations { get; set; }

        public DbSet<LoginOtpModel> LoginOtpModel { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Integrated Security=SSPI;Trusted_Connection=Yes;Initial Catalog=gocer");
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
    }
}