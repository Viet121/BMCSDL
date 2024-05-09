using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("GIAOVIEN")]
    public class GiaoVien
    {
        [Key]
        public string maGV { get; set; }
        public string tenGV { get; set; }
        public DateTime ngaySinh { get; set; }
        public string gioiTinh { get; set; }
        public string sdt { get; set; }
        public string diaChi { get; set; }
        //public virtual ICollection<LopHocPhan>? LopHocPhans { get; set; }
    }
}