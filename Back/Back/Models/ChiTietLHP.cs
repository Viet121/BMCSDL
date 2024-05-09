using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace Back.Models
{
    public class ChiTietLHP
    {
        [Key]
        public int Id { get; set; }
        public string MaLHP { get; set; }
        public string MaMH { get; set; }
        public int SoLuong { get; set; }
        public string TenMH { get; set; }
        public int SoLuongSV { get; set;}
        public string MaGV { get; set;}
        public string TenGV { get; set; }
        public string Thu { get; set; }
        public string Gio { get; set;}
        public string MaSV { get; set; }
        public string TenSV { get; set; }
        public double Diem { get; set; }
    }
}
