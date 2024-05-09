using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.Models
{
    [Table("THONGBAO")]
    public class ThongBao
    {
        [Key]
        public string maTB { get; set; }
        public string tieuDe { get; set; }
        public string noiDung { get; set; }
        public DateTime ngayTB { get; set; }
    }
}
