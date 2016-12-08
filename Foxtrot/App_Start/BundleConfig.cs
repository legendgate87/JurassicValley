using System.Web;
using System.Web.Optimization;

namespace Foxtrot
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/vally").Include(
                        "~/Scripts/deathVallyRemove.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/AngularScripts/angular.js",
               "~/Scripts/AngularScripts/angular-route.min.js",
               "~/Scripts/AngularScripts/angular-cookies.min.js",
               "~/Scripts/AngularScripts/angular-mocks.min.js",
               "~/Scripts/AngularScripts/angular-sanitize.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jQuery/jquery-{version}.js",
                        "~/Scripts/jQuery/jquery.unobtrusive-ajax.min.js",
                        "~/Scripts/jQuery/jquery.validate.min.js",
                        "~/Scripts/jQuery/jquery-ui.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jQuery/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                
                      "~/Scripts/Bootstrap/bootstrap.js",
                      "~/Scripts/Bootstrap/respond.js"
                      
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/amelia-bootstrap.min.css",
                   "~/Content/style.css",
                      "~/Content/jquery-ui.min.css",
                      "~/Content/flip.css",
                      "~/Content/animate.css"

                      ));

            
        }


    }
}
