using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Foxtrot.Startup))]
namespace Foxtrot
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
