using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("LOPHOCPHAN")]
    public class LopHocPhan
    {
        [Key]
        public string maLHP { get; set; }
        public string maMH { get; set; }
        public string maGV { get; set; }
        public string thu { get; set; }
        public string gio { get; set; }
        public int soLuong { get; set; }

        //public virtual ICollection<KetQua>? KetQuas { get; set; }
        //public virtual MonHoc? MonHocNavigation { get; set; }
        //public virtual GiaoVien? GiaoVienNavigation { get; set; }
        //public virtual ICollection<CMT_LHP>? CMT_LHPs { get; set; }
    }
}