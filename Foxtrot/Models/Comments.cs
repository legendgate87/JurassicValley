using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Foxtrot.Models
{

        [Table("CommentsTable")]
        public class CommentsTable
        {
            [Key]
            public int Id { get; set; }
            public string Comment { get; set; }

        }
    
}