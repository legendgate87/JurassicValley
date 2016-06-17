namespace Foxtrot.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Models;
   




    internal sealed class Configuration : DbMigrationsConfiguration<Foxtrot.Models.ApplicationDbContext>
    {

        static Random rnd = new Random();

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        Random rand = new Random();

        



        protected override void Seed(Foxtrot.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //

            DinoCreation.getdinosaurNames();
            DinoCreation.getdinosaurDiet();
            DinoCreation.getdinosaurPeriod();
            DinoCreation.getdinosaurShape();

            //context.Gender_FK.AddOrUpdate(
            //    new Gender_FK { Id = 1, Gender = "Male" },
            //     new Gender_FK { Id = 2, Gender = "Female" }

            //    );

            //context.Characteristics_FK.AddOrUpdate(
            //    new Characteristics_FK { Id = 1, Diet = "Carnivore" },
            //    new Characteristics_FK { Id = 2, Diet = "Herbivore" },
            //    new Characteristics_FK { Id = 3, Diet = "Omnivore" }
            //    );


            //bigger animals tend to have longer life spans than smaller animals. Dino lifespan should be estimated this way


            


            //context.SaveChanges();


            int pos = 0;
            int DietNew = 0;

            string Carn = "Carnivore";
            string Herb = "Herbivore";
            string Omni = "Omnivore";

            
            string Species = DinoCreation.dinosaurNames[pos];


            
            var nameCount = DinoCreation.dinosaurNames.Count();

            for (int i = 0; i < nameCount; i++)
            {
               string shape = DinoCreation.DinosaurShapes[i];
                string Diet = DinoCreation.dinosaurDiet[i];
                
                System.Threading.Thread.Sleep(10);

                if (Diet.Contains(Carn)) { DietNew = 1; }
                if (Diet.Contains(Herb)) { DietNew = 2; }
                if (Diet.Contains(Omni)) { DietNew = 3; }
                System.Threading.Thread.Sleep(10);

                //if (DinoCreation.DinosaurShapes[i].Contains(DinoCreation.dinosaurNames[i]))
                //{

                context.Dinopedia.AddOrUpdate(new Dinopedia
                {
                    Species = DinoCreation.dinosaurNames[i].ToLower(),
                    Gender = rand.Next(1, 3),
                    Diet = DietNew,
                    Period = DinoCreation.dinosaurPeriod[i],
                    Shape = shape.Substring(shape.IndexOf(" ") + 1).Replace(" ","")
            });
                    System.Threading.Thread.Sleep(10);
                    context.SaveChanges();
                    

                //}
                
                System.Threading.Thread.Sleep(10);
                
            }

        }

    }
        }