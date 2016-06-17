using Foxtrot.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Foxtrot.Controllers
{

    

    public class PopuController : Controller
    {

        ApplicationDbContext db = new ApplicationDbContext();

        
        public ActionResult Index()
        {
            return View();
        }
        

        // GET: Popu
        public PartialViewResult GetDataPopu()
        {
            List<DataValuesPopu> model = db.dataValuesPopu.ToList();

            return PartialView("GetDataPopu", model);
        }
    }
    }