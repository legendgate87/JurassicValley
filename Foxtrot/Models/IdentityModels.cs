using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Foxtrot.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<Characteristics_FK> Characteristics_FK { get; set; }
        public DbSet<Gender_FK> Gender_FK { get; set; }

        public DbSet<CommentsTable> CommentsTable { get; set; }
        public DbSet<DataValuesPopu> dataValuesPopu { get; set; }
        public DbSet<Dinopedia> Dinopedia { get; set; }
       
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}