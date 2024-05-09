using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    [Table("CTDAOTAO")]
    public class CTDaoTao
    {
        [Key]
        public string maCTDT { get; set; }
        public string tenCTDT { get; set; }
        public int soTinChi { get; set; }
        public int namDT { get; set; }

        
        //public virtual ICollection<MonHoc> MonHocs { get; set; } = new List<MonHoc>();

    }
}
