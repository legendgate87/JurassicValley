using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Foxtrot.Models
{
    public class DinoCreation
    {
        public static string logPath1 = $"{AppDomain.CurrentDomain.BaseDirectory}DinoList.txt";
        public static string logPath2 = $"{AppDomain.CurrentDomain.BaseDirectory}Description.txt";
        public static string logPath3 = $"{AppDomain.CurrentDomain.BaseDirectory}Period.txt";
        public static string logPath4 = $"{AppDomain.CurrentDomain.BaseDirectory}DinosaurShapes.txt";


        public static List<string> dinosaurNames = new List<string>();
        public static List<string> dinosaurPeriod = new List<string>();
        public static List<string> dinosaurDiet = new List<string>();
        public static List<string> DinosaurShapes = new List<string>();





        public static void getdinosaurNames()
        {

            using (var sr = new StreamReader(logPath1))
            {
                while (sr.Peek() >= 0)
                    dinosaurNames.Add(sr.ReadLine());
            }
            
        }

        public static void getdinosaurPeriod()
        {

            using (var sr = new StreamReader(logPath3))
            {
                while (sr.Peek() >= 0)
                    dinosaurPeriod.Add(sr.ReadLine());
            }
        }
        public static void getdinosaurDiet()
        {

            using (var sr = new StreamReader(logPath2))
            {
                while (sr.Peek() >= 0)
                    dinosaurDiet.Add(sr.ReadLine());
            }
        }
        public static void getdinosaurShape()
        {

            using (var sr = new StreamReader(logPath4))
            {
                while (sr.Peek() >= 0)
                    DinosaurShapes.Add(sr.ReadLine());
            }
           DinosaurShapes.OrderBy(x => x).ToList();

        }

    }

 
}