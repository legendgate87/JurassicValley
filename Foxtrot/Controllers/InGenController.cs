using Foxtrot.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Net;
using System.IO;

namespace Foxtrot.Controllers
{
    public class InGenController : Controller
    {

        ApplicationDbContext db = new ApplicationDbContext();

        // GET: InGen ----------------------------------------------

        public async Task<ActionResult> Dinopedia()
        {
            return View(await db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).ToListAsync());
        }


        public ActionResult Index()
        {

            //  List<Dinopedia> dinoList = db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).ToList();

            //include , FK -> list get
            return View(db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK));
        }

        public ActionResult InGen_Player_Partial()
        {
            return PartialView("~/Views/InGen/InGen_Player_Partial.cshtml");
        }


        [HttpPost]
        public async Task<ActionResult> Index(string SearchTerm)
        {

            

            //-----------------------------------------------------------
            List<Dinopedia> dinoReturn;

            if(string.IsNullOrEmpty(SearchTerm))
            {
                dinoReturn = await db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).ToListAsync();
            }
            else
            {
                dinoReturn = await db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).Where(x => x.Species.StartsWith(SearchTerm)).ToListAsync();
            }
            //include , FK -> list get
            return View(dinoReturn);
        }

        public ActionResult Details(int id)
        {
            
            
            return View();
        }

        [Authorize]
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Dinopedia/Edit/5

        [HttpPost]
        public async Task<ActionResult> Edit(Dinopedia collection)
        {
            if (ModelState.IsValid)
            {
                db.Dinopedia.AddOrUpdate(collection);

                await db.SaveChangesAsync();
                return RedirectToAction("Dinopedia");
            }
            return View(collection);
        }


        public async Task<JsonResult> GetDinos(string term)
        {
            List<string> dinoReturn;

           

            dinoReturn = await db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).Where(x => x.Species.StartsWith(term))
            .Select(y => y.Species).ToListAsync();
                
                
            
            //include , FK -> list get
            return Json(dinoReturn, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetShapePlayer(string playerName)
        {
            
           var dinGet = db.Dinopedia.Where(x => x.Species.Equals(playerName)).Select(x => x.Shape);
            
            return Json(dinGet, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetShapeOpponent(string opponent)
        {

            var dinGet = db.Dinopedia.Where(x => x.Species.Equals(opponent)).Select(x => x.Shape);

            return Json(dinGet, JsonRequestBehavior.AllowGet);
           
        }

        public JsonResult GetPeriodPlayer(string playerName)
        {

            var dinGet = db.Dinopedia.Where(x => x.Species.Equals(playerName)).Select(x => x.Period);

            return Json(dinGet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPeriodOpponent(string opponent)
        {

            var dinGet = db.Dinopedia.Where(x => x.Species.Equals(opponent)).Select(x => x.Period);

            return Json(dinGet, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetDietPlayer(string playerName)
        {

            var dinGet = db.Dinopedia.Where(x => x.Species.Equals(playerName)).Select(x => x.Diet);

            return Json(dinGet, JsonRequestBehavior.AllowGet);
        }

        //-------------------------------------------------


        public PartialViewResult AjaxTest()
        {
            System.Threading.Thread.Sleep(4000);

     List<Dinopedia> dinoList = db.Dinopedia.Include(m => m.Gender_FK).Include(m => m.Characteristics_FK).ToList();
            return PartialView("AjaxTest", dinoList);
        }

        


        

        
    }
}
