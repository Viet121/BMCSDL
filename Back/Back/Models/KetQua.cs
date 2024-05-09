using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("KQUA")]
    public class KetQua
    {
        [Key]
        public string maLHP { get; set; }
        [Key]
        public string maSV { get; set; }
        public double diem { get; set; }
        

        //public virtual LopHocPhan? LopHocPhanNavigation { get; set; } 

        //public virtual SinhVien? SinhVienNavigation { get; set; } 
    }
}
