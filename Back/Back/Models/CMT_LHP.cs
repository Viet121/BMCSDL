using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace Back.Models
{
    [Table("CMT_LHP")]
    public class CMT_LHP
    {
        [Key]
        public string maCMT { get; set; }
        public string maLHP { get; set; }
        public string noiDung { get; set; }
        public DateTime ngayCMT { get; set; }
        //public virtual LopHocPhan? LopHocPhanNavigation { get; set; }
    }
}
