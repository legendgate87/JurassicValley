using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Foxtrot.Models
{


    [Table("table_Population")]
    public class DataValuesPopu
    {
        [Key]
        public int Id { get; set; }
        public string Species { get; set; }
        public int PopValue { get; set; }

    }


}