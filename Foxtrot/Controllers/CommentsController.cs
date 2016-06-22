using Foxtrot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Foxtrot.Controllers
{
    public class CommentsController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        // GET: Comments
        public ActionResult Comments()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> CreateComment( )
        {

            try
            {
                //db..AddOrUpdate();
                await db.SaveChangesAsync();

                return View();
                
            }
            catch
            {

                return View();
            }
        }
    }
}