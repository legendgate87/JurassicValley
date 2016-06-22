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
        public async Task<ActionResult> CreateComment(CommentsTable commentsTable)
        {
            if (ModelState.IsValid)
            {
                var dataValue = new CommentsTable
                {
                    Id = commentsTable.Id,
                    Comment = commentsTable.Comment
                    
                };

        
                db.CommentsTable.Add(dataValue);



                try
                {
                    await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return Content(ex.Message);
                }

                
                return Content("Done!");
            }
            else
            {
                return Content("Something went wrong!");
            }

        }
        
        public JsonResult GetComments()
        {
            // List<string> comentsGet;

            var comentsGet = db.CommentsTable.ToList();
                

            return Json(comentsGet, JsonRequestBehavior.AllowGet);

        }
    }
}