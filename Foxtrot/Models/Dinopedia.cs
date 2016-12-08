using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Foxtrot.Models
{

    //   dateOfBirth: "November 23, 1980", title: "acm", idNumber: 1123198056874 }

    [Table("Dinopedia")]
    public class Dinopedia
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(30)]
            public string Species { get; set; }

            public int Gender { get; set; }

        [ForeignKey("Gender")]
            public Gender_FK Gender_FK { get; set; }

            public int Diet { get; set; }

        [ForeignKey("Diet")]
            public Characteristics_FK Characteristics_FK { get; set; }

        [MaxLength(20)]
        public string Period { get; set; }

        [MaxLength(20)]
        public string Shape { get; set; }

    }

    [Table("Characteristics_FK")]
    public class Characteristics_FK
    {
        [Key]
        public int Id { get; set; }
        public string Diet { get; set; }
        public IList<Dinopedia> Dinopedia { get; set; }

    }

    [Table("Gender_FK")]
    public class Gender_FK
    {
        [Key]
        public int Id { get; set; }
        public string Gender { get; set; }
        public IList<Dinopedia> Dinopedia { get; set; }
    }
}