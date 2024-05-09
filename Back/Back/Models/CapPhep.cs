using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("CAPPHEP")]
    public class CapPhep
    {
        [Key]
        public string maCP { get; set; }
        public string tenCP { get; set; }
        public int tinhTrang { get; set; }
    }
}