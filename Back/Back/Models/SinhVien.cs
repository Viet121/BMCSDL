using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("SINHVIEN")]
    public class SinhVien
    {
        [Key]
        public string maSV { get; set; }
        public string tenSV { get; set; }
        public DateTime ngaySinh { get; set; }
        public string gioiTinh { get; set; }
        public string sdt { get; set; }
        public string diaChi { get; set; }
        public int namNhapH { get; set; }
        public string maCTDT { get; set; }

        //public virtual ICollection<KetQua>? KetQuas { get; set; } 

        
    }
}
