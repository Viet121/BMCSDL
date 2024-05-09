using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("MONHOC")]
    public class MonHoc
    {
        [Key]
        public string maMH { get; set; }
        public string tenMH { get; set; }
        public int soTinChiMH { get; set; }
        public string maCTDT { get; set; }

        //public virtual ICollection<LopHocPhan>? LopHocPhans { get; set; }
        //public virtual CTDaoTao? CTDaoTaoNavigation { get; set; }
    }
}
